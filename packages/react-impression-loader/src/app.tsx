/*
 * @Author: Kanata You 
 * @Date: 2022-03-29 19:33:42 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-30 00:31:37
 */

import React from 'react';

import Demo from '@components/demo';
import DemoText from '@components/demo-text';
import DemoImage from '@components/demo-img';
import DemoMixed from '@components/demo-text-image';


const App: React.FC = () => (
  <>
    <Demo
      name="demo - text"
      src={DemoText}
    />
    <Demo
      name="demo - img"
      src={DemoImage}
    />
    <Demo
      name="demo - img & text"
      src={DemoMixed}
    />
  </>
);


export default App;
