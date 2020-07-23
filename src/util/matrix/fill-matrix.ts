import { PlainMatrix, Matrix, Alphabet, Pos, Maybe } from './../../types';

const pickRandomChar = (): Alphabet => String.fromCharCode(97 + ~~(Math.random() * 26)) as Alphabet;

const pickCharExcluded = (excluded: Alphabet[]): Alphabet => {
  let chosen: Alphabet;
  do {
    chosen = pickRandomChar();
  } while (excluded.includes(chosen));
  return chosen;
};

const charOfPos = (matrix: PlainMatrix, [x, y]: Pos): Maybe<Alphabet> =>
  (matrix[x]?.[y] ?? null) as Maybe<Alphabet>;

const neighboursOf = (matrix: PlainMatrix, [x, y]: Pos): Alphabet[] =>
  [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]
    .map(([x, y]) => charOfPos(matrix, [x, y]))
    .filter((e) => e !== null) as Alphabet[];

// TODO i18n support

export const fillMatrix = (matrix: PlainMatrix): Matrix =>
  matrix.map((row, i) =>
    row
      .split('')
      .map((e, j) => (e = e === '*' ? pickCharExcluded(neighboursOf(matrix, [i, j])) : e))
      .map((e) => e.toUpperCase()),
  );
