import * as React from 'react';
import ReactDOM from 'react-dom';
import { Clock } from './components/clock';
import { filledMatrix, getLightMap } from './matrix/en';

import './style.less';

ReactDOM.render(
  <Clock matrix={filledMatrix} getLightMap={getLightMap} />,
  document.querySelector('#app'),
);
