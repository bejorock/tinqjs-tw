import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";

export declare type IAutoCompleteValue<T extends any> = {
  id: any;
  content: T;
};

export interface IAutocompleteArgs {
  isOpen: boolean;
  value: IAutoCompleteValue<any>;
  onClick?: (e) => void;
  onReset?: (e) => void;
  children?: any;
  className?: string;
}

const Template = (
  { isOpen, value, onClick, onReset, children, className }: IAutocompleteArgs,
  ref: any
) => {
  return (
    <div className={className}>
      <div className="x-input-container">
        <div
          ref={ref}
          className="x-input-result"
          tabIndex={1}
          onClick={onClick}
        >
          <div className="x-input-result-item">
            {(value && value.content) || <>&nbsp;</>}
          </div>
        </div>

        {value && (
          <a href="#" className="x-input-clear" onClick={onReset}>
            <FontAwesomeIcon icon={faTimes} />
          </a>
        )}
      </div>
      {isOpen && children}
    </div>
  );
};

const Referable = forwardRef(Template);

export const AutoComplete = styled(Referable)`
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
