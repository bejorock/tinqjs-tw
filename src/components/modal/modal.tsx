import { Dialog, Transition } from "@headlessui/react";
import { ForwardedRef, forwardRef, Fragment, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";

export interface IModalControl {
  isOpen: boolean;
  onClose: () => void;
}

export interface IModalOptions<T extends IModalControl> {
  control: T;
  children: any;
  className?: string;
}

const Template = (
  { control, children, className }: IModalOptions<IModalControl>,
  ref: ForwardedRef<any>
) => {
  return (
    <Transition appear show={control.isOpen} as={Fragment}>
      <Dialog as="div" className={className} onClose={control.onClose}>
        <div className="x-dialog-container">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="x-dialog-overlay" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div ref={ref} className="x-dialog-body z-50">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

const Referable = forwardRef(Template);

const Modal = styled(Referable)`
  ${tw`fixed`}
  ${tw`inset-0`}
  ${tw`z-10`}
  ${tw`overflow-y-auto`}

  & .x-dialog-container {
    ${tw`min-h-screen`}
    ${tw`flex`}
    ${tw`justify-center`}
    ${tw`items-start`}
    ${tw`px-4`}
    ${tw`text-center`}
  }

  & .x-dialog-overlay {
    ${tw`fixed`}
    ${tw`inset-0`}
    ${tw`bg-black`}
    ${tw`opacity-30`}
  }

  & .x-dialog-body {
    ${tw`inline-block`}
    ${tw`w-full`}
    ${tw`my-8`}
    ${tw`overflow-visible`}
    ${tw`text-left`}
    ${tw`align-middle`}
    ${tw`transition-all`}
    ${tw`transform`}
    ${tw`bg-white`}
    ${tw`shadow-xl`}
    ${tw`rounded-md`}
  }

  & .x-dialog-body:not(.slim) {
    ${tw`max-w-md`}
    ${tw`p-4`}
  }
`;

export default Modal;

/* .modal {
  @apply inline-block;
  @apply w-full;
  @apply my-8;
  @apply overflow-visible;
  @apply text-left;
  @apply align-middle;
  @apply transition-all;
  @apply transform;
  @apply bg-white;
  @apply shadow-xl;
  @apply rounded-md;
}

.modal:not(.slim) {
  @apply max-w-md;
  @apply p-4;
} */
