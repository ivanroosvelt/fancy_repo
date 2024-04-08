import { User } from '@/app/types/user';
import { useLocalStorage } from './utils/useLocalStorage';

export const DEFAULT_USER: User = {
  name: '',
  level: 1,
  scoreboard: {
    ppm: 0,
    wpm: 0,
    accuracy: 0
  }
};

function useUser(): [User, (user: User) => void] {
  const [user, setUser] = useLocalStorage<User>('user', {
    ...DEFAULT_USER
  });

  return [user, setUser];
}

export default useUser;
