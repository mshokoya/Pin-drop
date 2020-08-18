import { useEffect, useRef } from 'react';
import isEqual from 'lodash.isequal';

export default (
  fn: () => void, 
  deps: ({[key: string]: any} | null)[]
) =>  {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    if (!deps[0]) return;

    const isSame = prevDeps.current.every((obj, index) =>
      isEqual(obj, deps[index])
    );

    if (isFirst.current || !isSame) {
      fn();
    }

    isFirst.current = false;
    prevDeps.current = deps;
  }, deps);
}