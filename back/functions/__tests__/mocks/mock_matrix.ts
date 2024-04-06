import { Matrix } from 'src/process';
import { ERRORS } from 'src/utils/validators';
import { z } from "zod";

export const CORRECT_MATRIX: Array<Matrix> = [
  [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ],
  [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 0]
  ]
];

export const CORRECT_MATRIX_RESULTS = [
  [
    [1, 9],
    [2, 4],
    [3, 1]
  ],
  [[1, 8]],
  [
    [1, 8],
    [2, 3]
  ]
];

export const INCORRECT_MATRIX: Array<any> = [
  [[], []],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0]
  ],
  [
    [1, 1, 'a'],
    [1, 0, 1],
    [1, 1, 1]
  ]
];

export const INCORRECT_MATRIX_RESULTS: Array<any> = [
  ERRORS.INVALID_MATRIX,
  ERRORS.INVALID_SIZE,
  ERRORS.INVALID_CHAR
];
