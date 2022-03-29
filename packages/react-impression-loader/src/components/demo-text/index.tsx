/*
 * @Author: Kanata You 
 * @Date: 2022-03-29 20:43:24 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-29 23:31:33
 */

import React from 'react';

import mockFetch from '@utils/mock-fetch';
import { useImpressionLoader } from '@components/react-impression-loader';


const DATA: string[] = [
  'This is a paragraph.',
  'This is a component with only text content.'
];

/**
 * This component only contains text content.
 */
const DemoTextOrigin: React.FC = () => {
  const [data, setData] = React.useState<string[] | null>(null);

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
        data?.map((d, i) => (
          <p
            key={i}
          >
            {d}
          </p>
        ))
      }
    </article>
  );
};

const DemoTextLoader: React.FC = () => {
  const data = React.useMemo(
    () => mockFetch(DATA, 2000),
    []
  );

  const DataLoader = useImpressionLoader(data, [
    'xxxxxxxxxx',
    'xxxxxxxxxxxxxxxxxxxxxxx'
  ]);

  return (
    <article
      style={{
        width: '320px',
        height: '110px'
      }}
    >
      <DataLoader>
        {
          d => d.map((d, i) => (
            <p
              key={i}
            >
              {d}
            </p>
          ))
        }
      </DataLoader>
    </article>
  );
};


const DemoText = {
  origin: DemoTextOrigin,
  loader: DemoTextLoader
};

export default DemoText;
