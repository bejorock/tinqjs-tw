import { ForwardedRef, forwardRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";

export declare type IFieldOpts = {
  required?: boolean;
  label?: string | JSX.Element;
  className?: string;
  children: any;
};

const Template = (props: IFieldOpts, ref: ForwardedRef<any>) => (
  <div ref={ref} className={props.className}>
    {props.label && (
      <label className="x-label">
        {props.label}{" "}
        {props.required ? <span tw="text-red-500 pr-0.5">*</span> : null}
      </label>
    )}
    {props.children}
  </div>
);

const Referable = forwardRef(Template);

export const Field = styled(Referable)`
  & * {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji !important";
  }

  & .x-label {
    ${tw`block`}
    ${tw`text-sm`}
    ${tw`font-medium`}
    ${tw`text-gray-700`}
  }

  & .x-info {
    ${tw`text-sm`}
    ${tw`text-gray-500`}
  }

  & .x-error {
    ${tw`text-sm`}
    ${tw`text-red-500`}
  }

  & .x-label.required::after {
    content: " *" ${tw`text-red-500`};
  }

  & input[type="text"].x-input,
  input[type="date"].x-input,
  input[type="month"].x-input,
  input[type="datetime-local"].x-input,
  input[type="email"].x-input,
  input[type="number"].x-input,
  input[type="password"].x-input,
  input[type="tel"].x-input {
    ${tw`mt-1`}
    ${tw`focus:ring-indigo-500`}
    ${tw`focus:border-indigo-500`}
    ${tw`block`}
    ${tw`w-full`}
    ${tw`shadow-sm!`}
    ${tw`sm:text-sm`}
    ${tw`border-gray-300`}
    ${tw`disabled:bg-gray-200`}
  }

  & input[type="text"].x-input:not(.not-rounded),
  input[type="date"].x-input:not(.not-rounded),
  input[type="month"].x-input:not(.not-rounded),
  input[type="datetime-local"].x-input:not(.not-rounded),
  input[type="email"].x-input:not(.not-rounded),
  input[type="number"].x-input:not(.not-rounded),
  input[type="password"].x-input:not(.not-rounded),
  input[type="tel"].x-input:not(.not-rounded) {
    ${tw`rounded-md!`}
  }

  & input[type="checkbox"].x-input,
  input[type="radio"].x-input {
    ${tw`block`}
    ${tw`focus:ring-indigo-500`}
    ${tw`h-4`}
    ${tw`w-4`}
    ${tw`text-indigo-600`}
    ${tw`border-gray-300`}
  }

  & textarea.x-input {
    ${tw`shadow-sm`}
    ${tw`focus:ring-indigo-500`}
    ${tw`focus:border-indigo-500`}
    ${tw`mt-1`}
    ${tw`block`}
    ${tw`w-full`}
    ${tw`sm:text-sm`}
    ${tw`border-gray-300`}
    ${tw`rounded-md!`}
  }

  & select.x-input {
    ${tw`mt-1`}
    ${tw`block`}
    ${tw`w-full`}
    ${tw`py-2`}
    ${tw`px-3`}
    ${tw`border`}
    ${tw`border-gray-300`}
    ${tw`bg-white`}
    ${tw`rounded-md!`}
    ${tw`shadow-sm!`}
    ${tw`focus:outline-none`}
    ${tw`focus:ring-indigo-500`}
    ${tw`focus:border-indigo-500`}
    ${tw`sm:text-sm`}
  }

  & .fakeInput.x-input {
    ${tw`mt-1`}
    ${tw`focus:ring-indigo-500`}
    ${tw`focus:border-indigo-500`}
    ${tw`w-full`}
    ${tw`shadow-sm!`}
    ${tw`sm:text-sm`}
    ${tw`border`}
    ${tw`rounded-md!`}
    ${tw`border-gray-300`}
    ${tw`disabled:bg-gray-200`}
  }

  & .fakeInput.x-input:not(.flex) {
    ${tw`block`}
  }

  & .fakeInput.x-input:not(.p-none) {
    ${tw`py-2`}
    ${tw`px-3`}
  }

  & .multiComplete.x-input {
    ${tw`mt-1`}
    ${tw`focus:ring-1`}
    ${tw`focus:ring-indigo-500`}
    ${tw`focus:border-indigo-500`}
    ${tw`w-full`}
    ${tw`shadow-sm!`}
    ${tw`sm:text-sm`}
    ${tw`border`}
    ${tw`rounded-md!`}
    ${tw`border-gray-300`}
    ${tw`disabled:bg-gray-200`}
    ${tw`py-1`}
    ${tw`px-1`}
    ${tw`bg-white`}
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  & .multiComplete.x-input::-webkit-scrollbar {
    display: none;
  }

  & .x-input {
    ${tw`py-2`}
    ${tw`px-3`}
  }
`;
