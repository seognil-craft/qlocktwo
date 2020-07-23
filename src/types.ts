export type PlainMatrix = string[];
export type Matrix<T extends any = string> = T[][];

export type Pos = [number, number];

export type Maybe<T = any> = T | null;

// TODO, board and fill, i18n support // Seognil LC 2020/07/23

export type Alphabet =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';
