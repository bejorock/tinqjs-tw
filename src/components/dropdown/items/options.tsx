import { ForwardedRef, forwardRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";

export interface IOptionsArgs {
  onFocus?: (e) => void;
  onBlur?: (e) => void;
  onChange?: (e) => void;
  className?: string;
  children: any;
}

const Template = (
  { onFocus, onBlur, onChange, className, children }: IOptionsArgs,
  ref: ForwardedRef<any>
) => {
  return (
    <div className={className} onMouseLeave={onBlur}>
      <div className="x-options-query">
        <input
          ref={ref}
          type="text"
          autoFocus={true}
          onFocus={onFocus}
          onChange={onChange}
        />
      </div>
      <div className="x-options-query-result">{children}</div>
    </div>
  );
};

const Referable = forwardRef(Template);

export const Options = styled(Referable)`
  ${tw`absolute`}
  ${tw`w-full`}
  ${tw`mt-2`}
  ${tw`py-2`}
  ${tw`rounded-md`}
  ${tw`shadow-lg`}
  ${tw`text-gray-800`}
  ${tw`bg-white`}
  ${tw`ring-1`}
  ${tw`ring-black`}
  ${tw`ring-opacity-5`}
  ${tw`focus:outline-none`}
  ${tw`z-10`}

  & > .x-options-query {
    ${tw`pb-2`}
    ${tw`px-2`}
  }

  & > .x-options-query > input {
    ${tw`mt-1`}
    ${tw`focus:ring-indigo-500`}
    ${tw`focus:border-indigo-500`}
    ${tw`block`}
    ${tw`w-full`}
    ${tw`shadow-sm`}
    ${tw`sm:text-sm`}
    ${tw`border-gray-300`}
    ${tw`disabled:bg-gray-200`}
    ${tw`rounded-md`}
  }

  & > .x-options-popup > .x-options-query-result {
    ${tw`max-h-40`}
    ${tw`overflow-y-auto`}
  }
`;
