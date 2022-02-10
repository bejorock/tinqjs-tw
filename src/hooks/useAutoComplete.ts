import { useMemo, useState } from "react";
import { useSafeMemo } from "../util";

declare type IAutoCompleteValue = {
  id: any;
  text: any;
};

export declare type IAutoCompleteControl = {
  setQuery: (query: string) => void;
  clear: () => void;
  value: IAutoCompleteValue;
};

export declare type IAutoCompleteService = {
  control: IAutoCompleteControl;
  options: any[];
  select: (id: any, value: any) => void;
};

export default function useAutoComplete(
  onQuery: (query: string, existingVal: any) => Promise<any[]>,
  defaultValue?: IAutoCompleteValue
): IAutoCompleteService {
  const [query_, setQuery] = useState<string>();
  const [value_, setValue] = useState<IAutoCompleteValue>(defaultValue);

  const options = useSafeMemo(
    async () => await onQuery(query_, value_ ? value_.id : null),
    [query_, value_],
    []
  );

  const select = (id: any, value: any) => {
    setValue({ id, text: value });
  };

  const clear = () => setValue(null);

  const control: IAutoCompleteControl = {
    setQuery,
    clear,
    value: value_,
  };

  return { control, options, select };
}
