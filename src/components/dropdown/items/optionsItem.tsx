import { ForwardedRef, forwardRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";

export interface OptionsItemArgs {
  onClick: (e) => void;
  className?: string;
  children: any;
}

const Template = (
  { onClick, className, children }: OptionsItemArgs,
  ref: ForwardedRef<any>
) => {
  return (
    <a ref={ref} href="#" className={className} onClick={onClick}>
      {children}
    </a>
  );
};

const Referable = forwardRef(Template);

export const OptionsItem = styled(Referable)`
  ${tw`block`}
  ${tw`w-full`}
  ${tw`px-3`}
  ${tw`py-2`}
  ${tw`hover:bg-gray-300`}
  ${tw`text-sm`}
  ${tw`hover:rounded-md`}
  ${tw`break-words`}
`;
