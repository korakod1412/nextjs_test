import { useSession } from 'next-auth/react';

const useAuthenticatedSession = () => {
  const props = useSession();

  if (props.status !== 'authenticated') throw new Error('Unauthorized');

  return props;
};

export default useAuthenticatedSession;
