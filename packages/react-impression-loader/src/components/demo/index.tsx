/*
 * @Author: Kanata You 
 * @Date: 2022-03-29 20:57:13 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-29 23:34:04
 */

import React from 'react';


export interface DemoProps {
  name: string;
  src: {
    origin: React.FC;
    loader: React.FC;
  };
}

const Demo: React.FC<DemoProps> = ({
  name, src
}) => {
  const [forceUpdateFlag, setForceUpdate] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (forceUpdateFlag) {
      setForceUpdate(false);
    }
  }, [forceUpdateFlag, setForceUpdate]);

  return (
    <section>
      <header>{name}</header>
      <div className="row">
        <button
          onClick={() => forceUpdateFlag || setForceUpdate(true)}
        >
          play
        </button>
      </div>
      <div className="row">
        <div className="item">
          <header>without impression-loader</header>
          {forceUpdateFlag || <src.origin />}
        </div>
        <div className="item">
          <header>with impression-loader</header>
          {forceUpdateFlag || <src.loader />}
        </div>
      </div>
    </section>
  );
};


export default Demo;
