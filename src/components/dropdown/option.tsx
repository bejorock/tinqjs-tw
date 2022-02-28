import { ForwardedRef, forwardRef, useContext } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { c } from "../../util";
import { ISelectValue, SelectContext } from "./select";

export interface OptionProps<T, V> {
  value: ISelectValue<T, V>;
  children: any;
  className?: string;
}

const Template = <T, V>(
  { value, children, className }: OptionProps<T, V>,
  ref: ForwardedRef<any>
) => {
  const context = useContext(SelectContext);

  return (
    <a
      ref={ref}
      href="#"
      className={className}
      onClick={c(() => context.click(value))}
    >
      {children}
    </a>
  );
};

const Referable = forwardRef(Template);

export const Option = styled(Referable)`
  ${tw`block`}
  ${tw`w-full`}
  ${tw`px-3`}
  ${tw`py-2`}
  ${tw`hover:bg-gray-300`}
  ${tw`text-sm`}
  ${tw`hover:rounded-md`}
  ${tw`break-words`}
`;
