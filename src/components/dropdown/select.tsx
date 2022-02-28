import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, ForwardedRef, forwardRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import { c } from "../../util";

export declare type ISelectValue<T extends unknown, V extends unknown> = {
  id: T;
  content: V;
};

export declare type ISelectContext = {
  click: (value: ISelectValue<any, any>) => void;
  setOpen: (value: boolean) => void;
};

export const SelectContext = createContext<ISelectContext>({
  click: () => {},
  setOpen: () => {},
});

export declare type ISelectProps<T extends unknown, V extends unknown> = {
  children: any;
  className?: string;
  value?: ISelectValue<T, V>;
  defaultValue?: ISelectValue<T, V>;
  renderResult?: (value: ISelectValue<T, V>) => JSX.Element;
  onChange?: (value: ISelectValue<T, V>) => void;
};

const defaultRenderResult = <T, V>(value: ISelectValue<T, V>) => (
  <span>{value.content}</span>
);

const defaultOnChange = <T, V>(_: ISelectValue<T, V>) => {};

const Template = <T, V>(
  {
    defaultValue,
    className,
    children,
    renderResult = defaultRenderResult,
    onChange = defaultOnChange,
  }: ISelectProps<T, V>,
  ref: ForwardedRef<any>
) => {
  const [innerValue, setInnerValue] = useState(defaultValue);
  const [isOpen, setOpen] = useState(false);

  const click = (v: ISelectValue<T, V>) => {
    onChange(v);
    setInnerValue(v);
    setOpen(false);
  };

  const reset = () => {
    onChange(null);
    setInnerValue(null);
  };

  return (
    <SelectContext.Provider value={{ click, setOpen }}>
      <div className={className}>
        <div className="x-input-container">
          <div
            ref={ref}
            className="x-input-result"
            tabIndex={1}
            onClick={c(() => setOpen(true))}
          >
            <div className="x-input-result-item">
              {(innerValue && renderResult(innerValue)) || <>&nbsp;</>}
            </div>
          </div>

          {innerValue && (
            <a href="#" className="x-input-clear" onClick={c(() => reset())}>
              <FontAwesomeIcon icon={faTimes} />
            </a>
          )}
        </div>
        {isOpen && children}
      </div>
    </SelectContext.Provider>
  );
};

const Referable = forwardRef(Template);

export const Select = styled(Referable)`
  ${tw`relative`}
  ${tw`w-full`}

  & > .x-input-container {
    ${tw`relative`}
  }

  & > .x-input-container > .x-input-result {
    ${tw`mt-1`}
    ${tw`py-2`}
    ${tw`px-3`}
    ${tw`bg-white`}
    ${tw`focus:ring-indigo-500`}
    ${tw`focus:border-indigo-500`}
    ${tw`w-full`}
    ${tw`shadow-sm`}
    ${tw`sm:text-sm`}
    ${tw`border`}
    ${tw`rounded-md`}
    ${tw`border-gray-300`}
    ${tw`disabled:bg-gray-200`}
    ${tw`focus:ring-1`}
  }

  & > .x-input-container > .x-input-result > div {
    ${tw`flex`}
    ${tw`items-center`}
    ${tw`gap-2`}
  }

  & > .x-input-container > .x-input-clear {
    ${tw`absolute`}
    ${tw`top-2`}
    ${tw`right-3`}
    ${tw`text-gray-200`}
    ${tw`hover:text-gray-700`}
  }
`;
