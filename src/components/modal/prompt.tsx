import { ForwardedRef, forwardRef } from "react";
import Modal, { IModalControl, IModalOptions } from "./modal";
import styled from "styled-components";
import tw from "twin.macro";

export interface IPromptControl extends IModalControl {
  approve: (e) => void;
  reject: (e) => void;
}

export interface IPromptOptions extends IModalOptions<IPromptControl> {
  question: string;
  answerYes?: string;
  answerNo?: string;
}

const Template = (props: IPromptOptions, ref: ForwardedRef<any>) => {
  return (
    <Modal {...props}>
      <h1 className="x-prompt-title " ref={ref}>
        {props.question}
      </h1>
      <div className="x-prompt-action">
        <button className="x-yes" onClick={props.control.approve}>
          {props.answerYes || "Yes"}
        </button>
        <button className="x-no " onClick={props.control.reject}>
          {props.answerNo || "No"}
        </button>
      </div>
    </Modal>
  );
};

const Referable = forwardRef(Template);

const Prompt = styled(Referable)`
  & > .x-prompt-title {
    ${tw`text-2xl`}
    ${tw`font-semibold`}
  }

  & > .x-prompt-action {
    ${tw`flex`}
    ${tw`justify-center`}
    ${tw`gap-1.5`}
  }

  & > .x-prompt-action > .x-yes {
    ${tw`border`}
    ${tw`border-green-700`}
    ${tw`rounded-md`}
    ${tw`bg-green-500`}
  }

  & > .x-prompt-action > .x-no {
    ${tw`border`}
    ${tw`border-red-700`}
    ${tw`rounded-md`}
    ${tw`bg-red-500`}
  }
`;

export default Prompt;