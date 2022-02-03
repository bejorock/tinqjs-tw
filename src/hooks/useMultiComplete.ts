import { useState } from "react";
import { useSafeMemo } from "../util";

export declare type IMultiCompleteValue = {
  id: any;
  text: any;
};

export declare type IMultiCompleteControl = {
  setQuery: (query: string) => void;
  clear: (id: any) => void;
  values: IMultiCompleteValue[];
};

export declare type IMultiCompleteService = {
  control: IMultiCompleteControl;
  options: any[];
  select: (id: any, value: any) => void;
};

export default function useMultiComplete(
  onQuery: (query: string, existingVals: any) => Promise<any[]>,
  defaultValue: IMultiCompleteValue[] = []
): IMultiCompleteService {
  const [query_, setQuery] = useState<string>();
  const [values_, setValues] = useState<IMultiCompleteValue[]>(defaultValue);

  const options = useSafeMemo(
    async () => await onQuery(query_, values_),
    [query_, values_],
    []
  );

  const select = (id: any, value: any) => {
    setValues([...values_, { id, text: value }]);
  };

  const clear = (id: any) => setValues(values_.filter((v) => v.id !== id));

  const control: IMultiCompleteControl = {
    setQuery,
    clear,
    values: values_,
  };

  return { control, options, select };
}
