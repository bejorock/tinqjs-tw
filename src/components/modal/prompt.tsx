import { ForwardedRef, forwardRef } from "react";
import { Modal, IModalOptions } from "./modal";
import styled from "styled-components";
import tw from "twin.macro";

/* export interface IPromptControl extends IModalControl {
  approve: (e) => void;
  reject: (e) => void;
} */

export interface IPromptOptions extends Omit<IModalOptions, "children"> {
  question: string;
  answerYes?: string;
  answerNo?: string;
  onApprove?: () => void;
  onReject?: () => void;
}

const Template = (props: IPromptOptions, ref: ForwardedRef<any>) => {
  return (
    <Modal {...props}>
      <h1 className="x-prompt-title " ref={ref}>
        {props.question}
      </h1>
      <div className="x-prompt-action">
        <button className="x-yes" onClick={props.onApprove}>
          {props.answerYes || "Yes"}
        </button>
        <button className="x-no " onClick={props.onReject}>
          {props.answerNo || "No"}
        </button>
      </div>
    </Modal>
  );
};

const Referable = forwardRef(Template);

export const Prompt = styled(Referable)`
  & .x-prompt-title {
    ${tw`text-3xl`}
    ${tw`font-semibold`}
    ${tw`mb-5`}
  }

  & .x-prompt-action {
    ${tw`flex`}
    ${tw`justify-start`}
    ${tw`gap-2`}
  }

  & .x-prompt-action .x-yes {
    ${tw`border`}
    ${tw`border-green-200`}
    ${tw`rounded-md`}
    ${tw`bg-green-400`}
    ${tw`hover:bg-green-500`}
    ${tw`px-3`}
    ${tw`py-1.5`}
    ${tw`text-white`}
    ${tw`font-semibold`}
  }

  & .x-prompt-action .x-no {
    ${tw`border`}
    ${tw`border-red-200`}
    ${tw`rounded-md`}
    ${tw`bg-red-400`}
    ${tw`hover:bg-red-500`}
    ${tw`px-3`}
    ${tw`py-1.5`}
    ${tw`text-white`}
    ${tw`font-semibold`}
  }
`;
