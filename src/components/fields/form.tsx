import {
  DetailedHTMLProps,
  FormHTMLAttributes,
  ForwardedRef,
  forwardRef,
} from "react";
import styled from "styled-components";
import tw from "twin.macro";

export declare type IForm = {
  className?: string;
  children: any;
} & Partial<
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
>;

const Template = (
  { className, children, ...props }: IForm,
  ref: ForwardedRef<any>
) => (
  <form {...props} ref={ref} className={className}>
    {children}
  </form>
);

const Referable = forwardRef(Template);

export const Form = styled(Referable)`
  ${tw`my-5`}
  ${tw`grid`}
  ${tw`grid-cols-1`}
  ${tw`gap-4`}
`;
