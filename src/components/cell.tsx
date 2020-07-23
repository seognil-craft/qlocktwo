import * as React from 'react';

export const Cell: React.FC<{ char: string; actived: boolean }> = ({ char, actived }) => (
  <span className={`cell ${actived ? 'actived' : ''}`}>{char}</span>
);
