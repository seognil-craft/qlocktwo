import { PlainMatrix, Matrix } from './../types';
import { getMarkOfTime } from './../util/time/get-mark-of-time';
import { fillMatrix } from './../util/matrix/fill-matrix';
import { bakeMatrix } from '../util/matrix/bake-matrix';
import { getAlignedTime } from '../util/time/get-aligned-time';

const matrix: PlainMatrix = [
  'it*is**rua*',
  '*quarter***',
  'twenty*five',
  'half*ten*to',
  'past*seven*',
  'onetwothree',
  'fourfivesix',
  'nine*twelve',
  'eighteleven',
  'ten**oclock',
  'seognil**lc',
];

const bakedInfo = bakeMatrix(matrix, {
  static: {
    always: ['it', 'is'],
    author: ['rua', 'seognil', 'lc'],
  },
  dynamic: {
    prefix: { words: { 0: 'oclock', 1: 'past', 2: 'to' } },
    minute: {
      words: { 5: 'five', 10: 'ten', 15: 'quarter', 20: 'twenty', 30: 'half' },
      extends: { 25: [20, 5] },
      searchRange: [0, 4],
    },
    hour: {
      words: {
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
      },
      searchRange: [4, 10],
    },
  },
});

export const getLightMap = ([h, m]: [number, number]): Matrix<number> => {
  const { prefix, hour, minute } = getMarkOfTime([h, m]);
  const points = [
    bakedInfo.always,
    bakedInfo.prefix[prefix],
    bakedInfo.hour[hour],
    bakedInfo.minute[minute],
  ];
  const bitmap = matrix.map((row) => row.split('').map((e) => 0));
  points.forEach((ps) => ps?.forEach(([x, y]) => (bitmap[x][y] = 1)));
  return bitmap;
};

export const filledMatrix = fillMatrix(matrix);
