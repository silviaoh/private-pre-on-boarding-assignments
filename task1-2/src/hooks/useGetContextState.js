import { useContext } from 'react';

const useGetContextState = context => {
  const value = useContext(context);
  const isNotFindProvider = !value;

  if (isNotFindProvider) {
    throw new Error('Cannot find  provider');
  } else {
    return value;
  }
};

export default useGetContextState;
