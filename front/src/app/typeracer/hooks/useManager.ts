import { useState } from 'react';
import useUser, { DEFAULT_USER } from './useUser';
import { useRouter } from 'next/navigation';
import { ProcessKey } from '@/app/types/manager';
import { ModalData } from '@/app/types/modal';

interface UserPerformance {
  timings: Array<number>;
  accuracy?: {
    correct: number;
    incorrect: number;
    accuracy: number;
  };
}
const DEFAULT_USER_PERFORMANCE: UserPerformance = {
  timings: [],
  accuracy: {
    correct: 0,
    incorrect: 0,
    accuracy: 0
  }
};

function useManager() {
  const [user, setUser] = useUser();
  const [userPerformance, setUserPerformance] = useState<UserPerformance>(
    DEFAULT_USER_PERFORMANCE
  );
  const [modalData, setModalData] = useState<ModalData>({
    visible: false,
    title: '',
    content: ''
  });

  const doHideModal = () => {
    setModalData({
      ...modalData,
      visible: false
    });
  };
  const router = useRouter();
  const updateTimings = (time: number) => {
    setUserPerformance((prev) => {
      return {
        ...prev,
        timings: [...prev.timings, time]
      };
    });
  };

  const updateAccuracy = (isCorrect: boolean) => {
    setUserPerformance((prev) => {
      return {
        ...prev,
        accuracy: {
          ...prev.accuracy,
          correct: isCorrect
            ? prev.accuracy!.correct + 1
            : prev.accuracy!.correct,
          incorrect: !isCorrect
            ? prev.accuracy!.incorrect + 1
            : prev.accuracy!.incorrect,
          accuracy:
            prev.accuracy!.correct /
            (prev.accuracy!.correct + prev.accuracy!.incorrect)
        }
      };
    });
  };

  const doProcessKey = (processKey: ProcessKey) => {
    if (processKey.key === 'RESTART') {
      doHideModal();
      return doReset();
    }
    updateAccuracy(processKey.isCorrect);
    if (processKey.isCorrect) {
      return updateTimings(processKey.time);
    }
  };

  const doReset = () => {
    doHideModal();
    setUserPerformance((prev) => ({
      ...prev,
      timings: [],
      accuracy: {
        correct: 0,
        incorrect: 0,
        accuracy: 0
      }
    }));
  };

  const doRestart = () => {
    doReset();
    setUser({
      ...user,
      level: 1,
      scoreboard: {
        ppm: 0,
        wpm: 0,
        accuracy: 0
      }
    });
  };
  const doSignOut = () => {
    setUser(DEFAULT_USER);
    router.replace('/');
  };

  const doFinish = (now: number, chars: number, words: number) => {
    setUserPerformance((prev) => ({
      ...prev,
      timings: [...prev.timings, now]
    }));

    const totalTime =
      userPerformance.timings
        .map((time, index, arr) => {
          if (index === 0) return 0;
          return time - arr[index - 1];
        })
        .reduce((acc, curr) => acc + curr, 0) / 1000;
    const ppm = (60 / totalTime) * chars;
    const wpm = (60 / totalTime) * words;

    if (userPerformance.accuracy!.accuracy * 100 > 90) {
      setModalData({
        visible: true,
        title: 'Congratulations',
        content: 'You have passed the level'
      });

      return setUser({
        ...user,
        scoreboard: {
          ppm,
          wpm,
          accuracy: userPerformance.accuracy!.accuracy
        },
        level: user.level + 1
      });
    }
    setModalData({
      visible: true,
      title: 'Try again!',
      content: `You only have ${(
        userPerformance.accuracy!.accuracy * 100
      ).toFixed(2)}% accuracy. Needed 90% to pass the level.`
    });
  };

  return {
    user,
    doUseProcessKey: doProcessKey,
    doFinish,
    userPerformance,
    doRestart,
    doReset,
    doSignOut,
    modalData,
    doHideModal
  };
}

export default useManager;
