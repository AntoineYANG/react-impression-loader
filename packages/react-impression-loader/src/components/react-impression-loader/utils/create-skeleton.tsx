/*
 * @Author: Kanata You 
 * @Date: 2022-03-29 21:48:09 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-30 00:33:24
 */

import React from 'react';


export interface SkeletonConfig {
  /** brightness of the background color, default = 0.92 */
  brightness?: number;
  /** speed of the background animation, default = 1x (1.6s) */
  speed?: number;
  /** shape of the skeleton of image elements when width equal height, default = 'circle' */
  imgMode?: 'rect' | 'circle';
}


const styleSheet = document.createElement('style');

styleSheet.innerHTML = `
  .impression-loader-text {
    color: #0000;
    border-radius: 4px;
    background-color: #ddd0;
    background-image: linear-gradient(90deg,
      #0000000e, #0000000e 2%, transparent 7%, transparent 93%, #0000000e 98%, #0000000e
    );
    background-size: 100vw 100vh;
    background-position: 0 0;
    background-attachment: fixed;
    background-repeat-x: repeat;
    backdrop-filter: brightness(0.92);
    user-select: none;
    animation: impression-loader-background-roll linear 1.6s infinite;
    transition: height 100ms;
  }
  
  .impression-loader-image {
    color: #0000;
    border-radius: 4px;
    background-color: #ddd0;
    background-image: linear-gradient(90deg,
      #0000000e, #0000000e 2%, transparent 7%, transparent 93%, #0000000e 98%, #0000000e
    );
    background-size: 100vw 100vh;
    background-position: 0 0;
    background-attachment: fixed;
    background-repeat-x: repeat;
    backdrop-filter: brightness(0.92);
    user-select: none;
    animation: impression-loader-background-roll linear 1.6s infinite;
    transition: height 100ms;
  }

  @keyframes impression-loader-background-roll {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 100vw 0;
    }
  }
`;

document.head.appendChild(styleSheet);

const makeImpression = (
  e: JSX.Element, config?: SkeletonConfig
): JSX.Element => {
  const {
    brightness = 0.92,
    speed = 1,
    imgMode = 'circle'
  } = config ?? {};

  const style: React.CSSProperties = {};
  
  if (brightness !== 0.92) {
    style.backdropFilter = `brightness(${brightness})`;
  }
  if (speed !== 1) {
    style.animationDuration = `${1.6 / speed}s`;
  }
  if (imgMode === 'circle' && e.type === 'img' && e.props.width === e.props.height) {
    style.borderRadius = '50%';
  }

  console.log('>', e);

  if (Array.isArray(e)) {
    // element array
    const children = e.map((c: JSX.Element) => makeImpression(c, config));

    return children as unknown as JSX.Element;
  } else if (e.type === 'img') {
    // image content
    return {
      ...e,
      props: {
        ...e.props,
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=',
        className: `${
          e.props.className ?? ''
        } impression-loader-image`.replace(/^ /, ''),
        ...(
          Object.keys(style).length ? {
            style: {
              ...e.props.style,
              ...style
            }
          } : {}
        )
      }
    }; 
  } else if (typeof e.props.children === 'string') {
    // string content
    return {
      ...e,
      props: {
        ...e.props,
        className: `${
          e.props.className ?? ''
        } impression-loader-text`.replace(/^ /, ''),
        ...(
          Object.keys(style).length ? {
            style: {
              ...e.props.style,
              ...style
            }
          } : {}
        )
      }
    };
  } else if (Array.isArray(e.props.children)) {
    // element array
    const children = e.props.children.map((c: JSX.Element) => makeImpression(c, config));

    return {
      ...e,
      props: {
        ...e.props,
        children
      }
    };
  } else if (e.props.children) {
    // single element
    return {
      ...e,
      props: {
        ...e.props,
        children: makeImpression(e.props.children, config)
      }
    };
  }

  return e;
};

const createSkeleton = <T extends unknown>(
  fakeData: Readonly<T>,
  renderer: (val: Readonly<T>) => (ReturnType<React.FC> | ReturnType<React.FC>[]),
  config?: SkeletonConfig
): JSX.Element => {
  const fake = (
    <>
      {renderer(fakeData)}
    </>
  );
  
  return (
    <>
      {makeImpression(fake, config)}
    </>
  );
};


export default createSkeleton;
