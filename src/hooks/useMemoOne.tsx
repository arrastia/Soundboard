import { useEffect, useMemo, useRef, useState } from 'react';

import { areInputsEqual } from '../utils/areInputsEqual';

type Cache<T> = {
  inputs?: any[];
  result: T;
};

export function useMemoOne<T>(getResult: () => T, inputs?: any[]): T {
  const initial: Cache<T> = useState(() => ({ inputs, result: getResult() }))[0];
  const isFirstRun = useRef<boolean>(true);
  const committed = useRef<Cache<T>>(initial);

  const useCache: boolean = isFirstRun.current || Boolean(inputs && committed.current.inputs && areInputsEqual(inputs, committed.current.inputs));

  const cache: Cache<T> = useMemo(() => (useCache ? committed.current : { inputs, result: getResult() }), [getResult, inputs, useCache]);

  useEffect(() => {
    isFirstRun.current = false;
    committed.current = cache;
  }, [cache]);

  return cache.result;
}
