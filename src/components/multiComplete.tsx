import "twin.macro";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { IMultiCompleteControl } from "../hooks/useMultiComplete";

export declare type MultiCompleteOptions = {
  control: IMultiCompleteControl;
  children?: any;
  onChange?: any;
  className?: string;
};

const MultiComplete = forwardRef(
  (
    { control, children, onChange, className }: MultiCompleteOptions,
    ref: any
  ) => {
    const [popup, setPopup] = useState(false);

    useEffect(() => onChange(control.values), [control.values]);

    return (
      <div className={className}>
        <div className="x-input-container">
          <div
            ref={ref}
            className="x-input-result"
            tabIndex={1}
            onClick={(e) => {
              setPopup(true);
            }}
            style={{ height: "38px" }}
          >
            {!control.values || control.values.length == 0 ? (
              <div className="py-1">&nbsp;</div>
            ) : (
              control.values.map((d, i) => (
                <div className="x-input-result-item" key={i}>
                  {d.text}
                  <a
                    href="#"
                    className="x-input-clear"
                    onClick={(e) => {
                      e.preventDefault();
                      control.clear(d.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
        {popup ? (
          <div className="x-input-popup">
            <div className="x-input-query">
              <input
                type="text"
                autoFocus={true}
                onBlur={() => {
                  setTimeout(() => {
                    setPopup(false);
                  }, 225);
                }}
                onChange={(e) => {
                  control.setQuery(e.target.value);
                }}
              />
            </div>
            <div className="x-input-query-result">{children}</div>
          </div>
        ) : null}
      </div>
    );
  }
);

export default styled(MultiComplete)`
  ${tw`relative`}
  ${tw`w-full`}

  & > .x-input-container {
    ${tw`relative`}
  }

  & > .x-input-container > .x-input-result {
    ${tw`mt-1`}
    ${tw`focus:ring-1`}
    ${tw`focus:ring-indigo-500`}
    ${tw`focus:border-indigo-500`}
    ${tw`w-full`}
    ${tw`shadow-sm`}
    ${tw`sm:text-sm`}
    ${tw`border`}
    ${tw`rounded-md`}
    ${tw`border-gray-300`}
    ${tw`disabled:bg-gray-200`}
    ${tw`py-1`}
    ${tw`px-1`}
    ${tw`bg-white`}
    ${tw`flex`}
    ${tw`flex-wrap`}
    ${tw`gap-2`}
    ${tw`overflow-y-scroll`}
  }

  & > .x-input-container > .x-input-result > .x-input-result-item {
    ${tw`flex`}
    ${tw`items-center`}
    ${tw`justify-center`}
    ${tw`gap-2`}
    ${tw`bg-yellow-100`}
    ${tw`rounded`}
    ${tw`py-1`}
    ${tw`px-1`}
    ${tw`cursor-pointer`}
    ${tw`text-gray-700`}
    ${tw`hover:text-gray-900`}
  }

  & > .x-input-popup {
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
  }

  & > .x-input-popup > .x-input-query {
    ${tw`pb-2`}
    ${tw`px-2`}
  }

  & > .x-input-popup > .x-input-query > input {
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

  & > .x-input-popup > .x-input-query-result {
    ${tw`max-h-44`}
    ${tw`overflow-y-auto`}
  }

  & .x-input-result,
  & .x-input-popup {
    --ms-overflow-style: none;
    scrollbar-width: none;
  }

  & .x-input-result::-webkit-scrollbar,
  & .x-input-popup::-webkit-scrollbar {
    display: none;
  }
`;
