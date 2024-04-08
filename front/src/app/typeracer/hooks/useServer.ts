import useSWR from 'swr';
import { postData } from './utils/fetcher';
import { User } from '@/app/types/user';

function useServer() {
  function useAppConfig(user: User) {
    const { data, error, isLoading, mutate } = useSWR(
      [`/api/mockServer/`, user],
      ([url, user]) => postData(url, { user }),
      { revalidateOnFocus: false }
    );
    const updateAppConfig = async (user: User) => {
      await mutate({ ...data, user });
    };

    return {
      data: data,
      isLoading,
      isError: error,
      updateAppConfig
    };
  }
  return {
    useAppConfig
  };
}

export default useServer;
