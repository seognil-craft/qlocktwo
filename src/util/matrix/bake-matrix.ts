import { PlainMatrix, Pos } from './../../types';
import { mapObjIndexed } from 'ramda';

type StaticSearchList = string[];
type DynamicSearchOpts = {
  words: Record<number, string>;
  searchRange?: [number, number];
  extends?: Record<number, number[]>;
};

const searchWordPos = (
  matrix: PlainMatrix,
  word: string,
  searchRange: [number, number] = [0, matrix.length - 1],
): Pos[] => {
  const [a, b] = searchRange;
  for (let row = a; row <= b; row++) {
    const col = matrix[row].indexOf(word);
    if (col !== -1) {
      return [].map.call(word, (e, i) => [row, col + i]) as Pos[];
    }
  }
  return [];
};

const bakeStaticPoints = (matrix: PlainMatrix, list: StaticSearchList): Pos[] => [
  ...list.flatMap((word) => searchWordPos(matrix, word)),
];

const bakeDynamicPoints = (matrix: PlainMatrix, opts: DynamicSearchOpts): Record<number, Pos[]> =>
  mapObjIndexed((e) => searchWordPos(matrix, e, opts.searchRange), opts.words);

export const bakeMatrix = <S extends string = any, D extends string = any>(
  matrix: PlainMatrix,
  searchConfig: {
    static?: Record<S, StaticSearchList>;
    dynamic?: Record<D, DynamicSearchOpts>;
  },
): Record<S, Pos[]> & Record<D, Record<number, Pos[]>> => {
  const {
    static: staticCfg = {} as Record<S, StaticSearchList>,
    dynamic: dynamicCfg = {} as Record<D, DynamicSearchOpts>,
  } = searchConfig;

  const staticMap = mapObjIndexed((e) => bakeStaticPoints(matrix, e), staticCfg);

  const dynamicMap = mapObjIndexed((e) => {
    const points = bakeDynamicPoints(matrix, e);
    const extendsPoints = mapObjIndexed(
      (e) => e.flatMap((e) => points[e]),
      e.extends ?? [],
    ) as Record<number, Pos[]>;
    return { ...points, ...extendsPoints };
  }, dynamicCfg);

  return { ...staticMap, ...dynamicMap };
};
