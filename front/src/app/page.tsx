'use client';
import Image from 'next/image';
import useUser, { DEFAULT_USER } from './typeracer/hooks/useUser';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { InfoModal } from './typeracer/components/modal/modal';

export default function Home() {
  const [user, setUser] = useUser();
  const [userName, setUserName] = useState('');
  const [modalData, setModalData] = useState({
    visible: false,
    title: '',
    content: ''
  });
  const router = useRouter();

  useEffect(() => {
    user.name !== DEFAULT_USER.name && router.push('/typeracer');
  });

  const handleStart = () => {
    if (userName.length < 3 || userName.length > 20) {
      setModalData({
        visible: true,
        title: 'Invalid username',
        content: 'Username must be between 3 and 20 characters long.'
      });
      return;
    }
    setUser({ ...user, name: userName });
    router.push('/typeracer');
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <InfoModal
        onClose={() => setModalData({ ...modalData, visible: false })}
        modalData={modalData}
      />

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <a
          href="https://github.com/ivanroosvelt/good_square/tree/master/front"
          className="group border border-transparent px-5 py-4 transition-colors "
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Github&nbsp;
            <code className="font-mono font-bold">repository {`>`}</code>
          </p>
        </a>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            href="https://github.com/ivanroosvelt"
            className="flex flex-col items-center group border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              height="32"
              aria-hidden="true"
              viewBox="0 0 16 16"
              version="1.1"
              width="32"
              data-view-component="true"
            >
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
            Profile
          </a>
        </div>
      </div>

      <div className="mx-auto my-auto grid max-w-2xl grid-cols-1">
        <div className="flex flex-col items-center justify-center mb-5">
          <Image src="/logo.svg" alt="Good Squares" width={200} height={200} />
          <h2
            className={`text-4xl my-2 font-semibold italic justify-center
        `}
          >
            Typeracer
          </h2>
        </div>
        <div>
          <label className="text-gray-800 text-lg font-semibold">
            Username
          </label>
          <input
            className="w-full p-4 mt-2 border border-gray-300 rounded-lg"
            value={userName}
            min={3}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div
          className="group border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 mt-6"
          onClick={handleStart}
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Begin{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Improve your typing speed and accuracy with Typeracer.
          </p>
        </div>
      </div>
    </main>
  );
}
