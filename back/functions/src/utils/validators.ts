export enum ERRORS {
  INVALID_MATRIX = 'Invalid matrix',
  INVALID_SIZE = 'Invalid matrix size',
  INVALID_CHAR = "Invalid character"
}

/**
 * Checks if the input is a valid 2D array.
 * @param matrix - The input matrix to be validated.
 * @returns Returns void on valid 2D array, exception otherwise.
 */
export const matrixValidator = (matrix: unknown): void => {
  if (!Array.isArray(matrix)) {
    throw ERRORS.INVALID_MATRIX;
  }
  if (matrix.length === 0) {
    throw ERRORS.INVALID_MATRIX;
  }
  if (!Array.isArray(matrix[0])) {
    throw ERRORS.INVALID_MATRIX;
  }
  if (matrix[0].length === 0) {
    throw ERRORS.INVALID_MATRIX;
  }
  if (matrix.some((row) => row.length !== matrix[0].length)) {
    throw ERRORS.INVALID_SIZE;
  }
  if (
    matrix.some((row) =>
      row.some(
        (cell: any) => typeof cell !== 'number' || ![0, 1].includes(cell)
      )
    )
  ) {
    throw ERRORS.INVALID_CHAR;
  }
};
