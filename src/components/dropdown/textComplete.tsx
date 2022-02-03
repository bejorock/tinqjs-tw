import { ForwardedRef, forwardRef, useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import { useSafeMemo } from "../../util";
import { AutoComplete, IAutoCompleteValue } from "./autoComplete";
import { Options } from "./items/options";
import { OptionsItem } from "./items/optionsItem";

/* export interface ITextCompleteControl {
  value: IAutoCompleteValue<string>;
  data: IAutoCompleteValue<string>[];
  setValue: (value: IAutoCompleteValue<string>) => void;
  onInputChange: (value: string) => void;
  clear: () => void;
} */

export declare type ITextCompleteArgs = {
  // control: ITextCompleteControl;
  defaultValue?: IAutoCompleteValue<string>;
  onQuery?: (
    keywords: string
  ) => IAutoCompleteValue<string>[] | Promise<IAutoCompleteValue<string>[]>;
  onChange?: (value: IAutoCompleteValue<string>) => void;
  className?: any;
};

const mapOption =
  (select: (item: IAutoCompleteValue<string>) => (e) => void) =>
  (item: IAutoCompleteValue<string>, index: number) =>
    (
      <OptionsItem key={index} onClick={select(item)}>
        {item.content}
      </OptionsItem>
    );

const Template = (props: ITextCompleteArgs, ref: ForwardedRef<any>) => {
  const [isOpen, toggleOpen, _, forceClose] = useToggle(false);
  const [input, setInput] = useState("");
  const [value, setValue] = useState(props.defaultValue);
  const data = useSafeMemo(
    async () => await props.onQuery(input),
    [input, isOpen],
    []
  );

  const onInput = (e) => setInput(e.target.value);
  const onChange = (item: IAutoCompleteValue<string>) => (e) => {
    e.preventDefault();

    setValue(item);
    if (props.onChange) props.onChange(item);
    forceClose();
  };
  const onReset = onChange(null);

  return (
    <AutoComplete
      ref={ref}
      isOpen={isOpen}
      onClick={toggleOpen}
      onReset={onReset}
      value={value}
      className={props.className}
    >
      <Options onFocus={onInput} onBlur={forceClose} onChange={onInput}>
        {data.map(mapOption(onChange))}
      </Options>
    </AutoComplete>
  );
};

export const TextComplete = forwardRef(Template);
