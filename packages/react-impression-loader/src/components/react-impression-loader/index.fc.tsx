/*
 * @Author: Kanata You 
 * @Date: 2022-03-29 19:29:50 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-30 00:37:51
 */

import React from 'react';
import createSkeleton, { SkeletonConfig } from './utils/create-skeleton';


const useImpressionLoader = <T extends unknown>(
  data: Promise<T>,
  fakeData?: Readonly<T>,
  config?: SkeletonConfig
) => {
  const [resolved, setResolved] = React.useState(false);
  const [value, setValue] = React.useState<T | undefined>(undefined);

  React.useEffect(() => {
    let alive = true;
    
    if (!resolved) {
      setValue(undefined);
      setResolved(false);
      
      data.then(val => {
        if (alive && !resolved) {
          setValue(val);
          setResolved(true);
        }
      }).catch(err => {
        console.error(err);
      });
    }

    return () => {
      alive = false;
    };
  }, [data, resolved, setResolved]);

  const [skeleton, setSkeleton] = React.useState<JSX.Element | null>(null);

  const Loader: React.FC<{
    children: (val: Readonly<T>) => (ReturnType<React.FC> | ReturnType<React.FC>[])
  }> = React.memo(function Loader({
    children: renderer
  }) {
    React.useEffect(() => {
      if (!skeleton) {
        return setSkeleton(
          fakeData !== undefined
          ? createSkeleton(fakeData, renderer, config)
          : <p className="impression-loader-text" />
        );
      }
    }, [renderer]);

    if (resolved) {
      // expected view
      return (
        <React.Fragment>
          {renderer(value as T)}
        </React.Fragment>
      )
    } else {
      // skeleton
      return skeleton;
    }
  });

  return Loader;
};


export default useImpressionLoader;
