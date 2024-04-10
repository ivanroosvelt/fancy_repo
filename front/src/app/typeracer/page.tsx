'use client';

import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import Image from 'next/image';
import useServer from './hooks/useServer';
import useManager from './hooks/useManager';
// import TyperInput from './components/typerInput';
import { InfoModal } from './components/modal/modal';
import dynamic from 'next/dynamic';

const TyperInput = dynamic(() => import('./components/typerInput'), {
  ssr: false
});

export default function Page() {
  const { useAppConfig } = useServer();
  const {
    doUseProcessKey,
    doReset,
    doFinish,
    user,
    doRestart,
    doSignOut,
    modalData,
    doHideModal
  } = useManager();
  const { data, isLoading, isError } = useAppConfig(user);

  return (
    <main className="flex flex-col items-center justify-between py-2">
      <InfoModal onClose={doHideModal} modalData={modalData} />
      <div className="flex flex-row justify-center w-2/4 mb-4">
        <Image src="/logo.svg" alt="Good Squares" width={50} height={50} />
        <h2
          className={`text-4xl ml-2 mt-2 font-semibold italic justify-center
      `}
        >
          TypeRacer
        </h2>
      </div>
      <div className="flex flex-col align-middle border border-solid bg-white leading-7 p-2">
        <div className="self-end mb-1 px-5">
          <button
            onClick={() => doRestart()}
            className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-1 px-4 border border-white rounded mr-2"
          >
            Restart
          </button>
          <button
            onClick={() => doSignOut()}
            className="bg-rose-800 hover:bg-rose-700 text-white font-bold py-1 px-4 border border-white rounded"
          >
            Sign Out
          </button>
        </div>
        <div className="flex flex-col px-4">
          <div className="flex flex-row justify-between text-gray-800 mb-2">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <h2 className="text-2xl font-bold">Level {user.level}</h2>
          </div>
          <div className="flex flex-row justify-between text-gray-400 leading-5">
            <div className="flex flex-col">
              <strong className="mb-1">Metrics:</strong>
              <span className="mb-1">
                Speed:{' '}
                {` ${user.scoreboard.ppm.toFixed(
                  2
                )} ppm (${user.scoreboard.wpm.toFixed(2)} wpm) `}
              </span>
              <span>
                Accuracy: {` ${(user.scoreboard.accuracy * 100).toFixed(2)}%`}
              </span>
            </div>
            {!isLoading && !isError && (
              <div className="flex flex-col">
                <strong>All keys: </strong>
                <span className="mb-2">
                  {`${data.typerInputPayload.context.baseConstants.baseLetters}`}
                </span>
                <strong>Word length: </strong>
                <span>
                  {`From ${
                    data.typerInputPayload.context.baseConstants.baseLength.split(
                      ','
                    )[0]
                  } to ${
                    data.typerInputPayload.context.baseConstants.baseLength.split(
                      ','
                    )[1]
                  } letters`}
                </span>
                <br />
              </div>
            )}
          </div>
        </div>
        {isLoading && (
          <div className="flex flex-row w-full justify-center my-8 ">
            Loading...
            <svg className="animate-spin w-6 h-6 ml-2" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="purple"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="purple"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.418 0 8-3.582 8-8h-2c0 3.866-3.134 7-7 7-3.866 0-7-3.134-7-7H6c0 2.418 1.03 4.582 2.693 6.123z"
              ></path>
            </svg>
          </div>
        )}
        {!isLoading && !isError && (
          <>
            <TyperInput
              typerInputPayload={data.typerInputPayload}
              onProcessKey={doUseProcessKey}
              doReset={doReset}
              doFinish={doFinish}
            />
            <div className="flex flex-grow items-center justify-center">
              <Keyboard physicalKeyboardHighlight={true} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
