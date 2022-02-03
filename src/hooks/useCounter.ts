import { useState } from "react";

export const useCounter = (initialValue?: number) => {
  const [state, setState] = useState(initialValue);

  const incr = () => setState(state + 1);

  const decr = () => setState(state - 1);

  return [state, incr, decr];
};
