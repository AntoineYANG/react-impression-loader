/*
 * @Author: Kanata You 
 * @Date: 2022-03-29 23:45:53 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-30 00:37:13
 */

import React from 'react';

import mockFetch from '@utils/mock-fetch';
import { useImpressionLoader } from '@components/react-impression-loader';

// @ts-ignore
import imgSrc from '@public/logo192.png';


const DATA: string = imgSrc;

/**
 * This component only contains image content.
 */
const DemoImageOrigin: React.FC = () => {
  const [data, setData] = React.useState<string | null>(null);

  React.useEffect(() => {
    let alive = true;

    if (!data) {
      mockFetch(DATA, 2000).then(d => {
        if (alive) {
          setData(d);
        }
      });
    }

    return () => {
      alive = false;
    };
  }, [setData]);

  return (
    <article
      style={{
        width: '320px',
        height: '110px'
      }}
    >
      {
        data && <img src={data} alt="image" width="60" height="60" />
      }
    </article>
  );
};

const DemoImageLoader: React.FC = () => {
  const data = React.useMemo(
    () => mockFetch(DATA, 2000),
    []
  );

  const DataLoader = useImpressionLoader(data, '');

  return (
    <article
      style={{
        width: '320px',
        height: '80px'
      }}
    >
      <DataLoader>
        {
          d => <img src={d} alt="image" width="60" height="60" />
        }
      </DataLoader>
    </article>
  );
};


const DemoImage = {
  origin: DemoImageOrigin,
  loader: DemoImageLoader
};

export default DemoImage;
