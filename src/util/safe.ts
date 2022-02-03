import { useEffect, useState } from "react";

export default function safe(cb: Function, onError?: Function) {
  cb().catch((err) => {
    console.log(err);

    if (onError) onError(err);
  });
}

export function useSafe(cb: () => Promise<any>, dependencies?: any[]) {
  const [error, setError] = useState(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    /* (async () => {
      return await cb();
    })()
      .catch((err) => setError(err))
      .finally(() => setComplete(true)); */

    let cleanupFn = null;

    cb()
      .then((fn) => (cleanupFn = fn))
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setComplete(true));

    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, dependencies);

  return { error, complete };
}

export function useSafeMemo<T>(
  factory: () => Promise<T>,
  dependencies?: any[],
  defaultValue?: any
) {
  const [state, setState] = useState<T>(defaultValue);

  useSafe(async () => {
    const result = await factory();

    setState(result);
  }, dependencies);

  return state;
}
