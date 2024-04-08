import { ApiHandler } from 'sst/node/api';
import { matrixValidator } from './utils/validators';

export type Matrix = Array<Array<number>>;

export const handler = ApiHandler(async (_evt) => {
  try {
    const matrix = JSON.parse(_evt.body ?? '[]');
    const result = matrixProcessor(matrix);

    return {
      statusCode: 200,
      body: JSON.stringify({
        total: result.reduce(
          (acc: number, [_, count]: [number, number]) => acc + count,
          0
        ),
        summary: result
      })
    };
  } catch (error: unknown) {
    console.info(error);
    return {
      statusCode: 400,
      body: (error as Error).message ?? error
    };
  }
});

type PerfectSquares = Record<number, number>;

export const matrixProcessor = (matrix: Matrix): any => {
  // Validate input matrix, throw if invalid
  matrixValidator(matrix);

  const jobMatrix = matrix as Matrix;

  const n = jobMatrix.length;

  const sizeCounts: PerfectSquares = {}; // Object to store counts of squares by size

  // Iterate through the matrix
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (jobMatrix[i][j] === 1) {
        // Initialize sizeCounts for the current cell
        const maxSize = n - i; // Maximum possible size of square from (i, j)
        for (let size = 1; size <= maxSize; size++) {
          if (isSquareOfOnes(jobMatrix, i, j, size)) {
            if (!sizeCounts[size]) {
              sizeCounts[size] = 0;
            }
            sizeCounts[size]++;
          } else {
            break; // No longer squares of size
          }
        }
      }
    }
  }

  // Convert sizeCounts object to an array of [size, count] pairs
  const result = [];
  for (const size in sizeCounts) {
    result.push([parseInt(size), sizeCounts[size]]);
  }

  return result;
};

// Function to check if a square of size `size` starting at (startRow, startCol) is all ones
function isSquareOfOnes(
  matrix: Matrix,
  startRow: number,
  startCol: number,
  size: number
) {
  for (let i = startRow; i < startRow + size; i++) {
    for (let j = startCol; j < startCol + size; j++) {
      if (matrix[i][j] !== 1) {
        return false;
      }
    }
  }
  return true;
}
