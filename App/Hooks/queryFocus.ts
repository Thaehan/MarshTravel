import {useEffect, useRef, useCallback} from 'react';
import {AppState, AppStateStatus} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

export default function useQueryFocus<T>(
  refetch: () => Promise<T> | void,
  timeout?: number,
) {
  const isMountedRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      // do not refetch when query is initially mounted
      if (isMountedRef.current) {
        isMountedRef.current = false;
        return;
      }
      if (timeout) {
        const newTimeout = setTimeout(() => {
          refetch();
        }, timeout);
        return () => clearTimeout(newTimeout);
      }
      refetch();
    }, [refetch]),
  );

  useEffect(() => {
    const handleAppStateChange = (appState: AppStateStatus) => {
      if (appState === 'active' && isMountedRef.current) {
        refetch();
      }
    };

    const register = AppState.addEventListener('change', handleAppStateChange);
    isMountedRef.current = true;
    return () => {
      register?.remove?.();
    };
  }, []);
}
