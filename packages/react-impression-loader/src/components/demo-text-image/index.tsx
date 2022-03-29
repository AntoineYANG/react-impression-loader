/*
 * @Author: Kanata You 
 * @Date: 2022-03-30 00:27:16 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-30 00:36:58
 */

import React from 'react';

import mockFetch from '@utils/mock-fetch';
import { useImpressionLoader } from '@components/react-impression-loader';

// @ts-ignore
import imgSrc from '@public/logo192.png';


const DATA: {
  imgSrc: string;
  text: string[];
} = {
  imgSrc,
  text: [
    'This is a paragraph.',
    'This is a component with only text content.'
  ]
};

/**
 * This component contains text and image.
 */
const DemoMixedOrigin: React.FC = () => {
  const [data, setData] = React.useState<typeof DATA | null>(null);

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
        height: '110px',
        display: 'flex'
      }}
    >
      {
        data && (
          <>
            <img src={data.imgSrc} alt="image" width="40" height="40" />
            <div
              style={{
                flexGrow: 1,
                marginLeft: '1em'
              }}
            >
              {
                data.text.map((d, i) => (
                  <p
                    key={i}
                  >
                    {d}
                  </p>
                ))
              }
            </div>
          </>
        )
      }
    </article>
  );
};

const DemoMixedLoader: React.FC = () => {
  const data = React.useMemo(
    () => mockFetch(DATA, 2000),
    []
  );

  const DataLoader = useImpressionLoader(data, {
    imgSrc: '',
    text: ['xx', 'xxx']
  });

  return (
    <article
      style={{
        width: '320px',
        height: '110px',
        display: 'flex'
      }}
    >
      <DataLoader>
        {
          val => (
            <>
              <img src={val.imgSrc} alt="image" width="40" height="40" />
              <div
                style={{
                  flexGrow: 1,
                  marginLeft: '1em'
                }}
              >
                {
                  val.text.map((d, i) => (
                    <p
                      key={i}
                    >
                      {d}
                    </p>
                  ))
                }
              </div>
            </>
          )
        }
      </DataLoader>
    </article>
  );
};


const DemoMixed = {
  origin: DemoMixedOrigin,
  loader: DemoMixedLoader
};

export default DemoMixed;
