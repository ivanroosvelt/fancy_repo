'use client';

import { useState } from 'react';

interface Matrix {
  height: number;
  width: number;
}

const INITIAL_SIZE: Matrix = {
  height: 3,
  width: 3
};

const useMatrix = ({ height = 0, width = 0 }) => {
  const [matrix, setMatrix] = useState<Matrix>({ height, width });
  const setMatrixSize = (height: number, width: number) => {
    setMatrix({ height, width });
  };
  return { matrix, setMatrixSize };
};

export default function Page() {
  const { matrix, setMatrixSize } = useMatrix(INITIAL_SIZE);

  const updateMatrixSize = () => {
    const height = Number(
      (document.getElementById('height') as HTMLInputElement).value
    );
    const width = Number(
      (document.getElementById('width') as HTMLInputElement).value
    );
    setMatrixSize(height, width);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-around w-full">
        <div className="flex flex-col align-middle border border-solid px-4 py-4 bg-white opacity-">
          <div className="mr-4">
            <p className="font-mono font-bold">
              You can change the matrix size:
            </p>
            <br />
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="height" className="mr-4 font-mono font-bold">
                Height
              </label>
              <input
                type="number"
                id="height"
                className="w-2/4 font-mono border border-solid"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="width" className="mr-4 font-mono font-bold">
                Width
              </label>
              <input
                type="number"
                id="width"
                className="w-2/4 font-mono border border-solid"
              />
            </div>
          </div>
          <button
            className="font-mono font-bold group mr-5 border border-solid px-4 py-2 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            onClick={updateMatrixSize}
          >
            Apply
          </button>
        </div>
        <div className="flex flex-col justify-end">
          <button className="font-mono font-bold group border border-solid px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 mb-4">
            Calculate
          </button>
          <button className="font-mono font-bold group border border-solid px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 ">
            Reset
          </button>
        </div>
      </div>
      <div className="flex flex-grow items-center justify-center">
        {matrix.width}
        <div className={`grid grid-cols-${matrix.width} gap-4`}>
          {/* <div className={`grid grid-cols-${matrix.width} gap-4`}> */}
          <input type="checkbox" id="show" />
          <input type="checkbox" id="show" />
          <input type="checkbox" id="show" />
          <input type="checkbox" id="show" />
          <input type="checkbox" id="show" />
          <input type="checkbox" id="show" />
          <input type="checkbox" id="show" />
        </div>
      </div>
    </main>
  );
}
