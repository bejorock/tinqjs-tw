import { ForwardedRef, forwardRef, useContext, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import { SelectContext } from "./select";

export declare type IOptionsProps = {
  onChange: (e) => void;
  onFocus?: (e) => void;
  children: any;
  className?: string;
};

const Template = (props: IOptionsProps, ref: ForwardedRef<any>) => {
  const context = useContext(SelectContext);

  // useEffect(() => console.log("dfd"), []);

  return (
    <div
      className={props.className}
      onMouseLeave={() => context.setOpen(false)}
    >
      <div className="x-options-query">
        <input
          type="text"
          ref={ref}
          autoFocus={true}
          onFocus={props.onFocus}
          onChange={props.onChange}
        />
      </div>
      <div className="x-options-query-result">{props.children}</div>
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
