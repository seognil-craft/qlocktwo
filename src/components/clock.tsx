import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Matrix } from './../types';
import { Cell } from './cell';
import { getAlignedTime } from '../util/time/get-aligned-time';
import { setInterval } from 'timers';

export const Clock: React.FC<{
  matrix: Matrix;
  getLightMap: (t: [number, number]) => Matrix<number>;
}> = ({ matrix, getLightMap }) => {
  const [[h, m], setTime] = useState(getAlignedTime(new Date()));

  useEffect(() => {
    const timer = setInterval(() => setTime(getAlignedTime(new Date())), 1000);
    return () => clearInterval(timer);
  }, []);

  const content = useMemo(() => {
    const lightMap = getLightMap([h, m]);

    return (
      <div id="clock">
        {matrix.map((row, i) => (
          <div className="row" key={i}>
            {row.map((e, j) => (
              <Cell char={e} actived={lightMap[i][j] === 1} key={j} />
            ))}
          </div>
        ))}
      </div>
    );
  }, [h, m]);
  return content;
};
