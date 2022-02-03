import { useState } from "react";

export const useToggle = (
  initialValue?: boolean
): [boolean, () => void, () => void, () => void] => {
  const [state, setState] = useState(initialValue);

  const toggle = () => setState(!state);

  const forceTrue = () => setState(true);

  const forceFalse = () => setState(false);

  return [state, toggle, forceTrue, forceFalse];
};
