import { matrixProcessor, handler } from '../src/process';
import { HandlerResponse, requestGenerator } from './mocks/helper';
import {
  CORRECT_MATRIX,
  CORRECT_MATRIX_RESULTS,
  INCORRECT_MATRIX,
  INCORRECT_MATRIX_RESULTS
} from './mocks/mock_matrix';

describe('handler', () => {
  it('should success query', async () => {
    const result = await handler(requestGenerator(CORRECT_MATRIX[0]), {});
    const response = HandlerResponse.safeParse(result);

    expect(response.success).toEqual(true);
    expect(result.statusCode).toEqual(200);
  });
  it('should fail query', async () => {
    const result = await handler(requestGenerator(INCORRECT_MATRIX[0]), {});
    const response = HandlerResponse.safeParse(result);

    expect(response.success).toEqual(true);
    expect(result.statusCode).toEqual(400);
  });
});

describe('matrixProcessor', () => {
  it('should correctly count squares on example 1', () => {
    const result = matrixProcessor(CORRECT_MATRIX[0]);

    // Expected result: array of [size, count] pairs
    expect(result).toEqual(CORRECT_MATRIX_RESULTS[0]);
  });
  it('should correctly count squares on example 2', () => {
    const result = matrixProcessor(CORRECT_MATRIX[1]);

    // Expected result: array of [size, count] pairs
    expect(result).toEqual(CORRECT_MATRIX_RESULTS[1]);
  });
  it('should correctly count squares on example 3', () => {
    const result = matrixProcessor(CORRECT_MATRIX[2]);

    // Expected result: array of [size, count] pairs
    expect(result).toEqual(CORRECT_MATRIX_RESULTS[2]);
  });

  it('should throw by invalid matrix', () => {
    expect(() => matrixProcessor(INCORRECT_MATRIX[0])).toThrow(
      INCORRECT_MATRIX_RESULTS[0]
    );
  });
  it('should throw by invalid matrix size', () => {
    expect(() => matrixProcessor(INCORRECT_MATRIX[1])).toThrow(
      INCORRECT_MATRIX_RESULTS[1]
    );
  });

  it('should throw by invalid char on matrix', () => {
    expect(() => matrixProcessor(INCORRECT_MATRIX[2])).toThrow(
      INCORRECT_MATRIX_RESULTS[2]
    );
  });
});
