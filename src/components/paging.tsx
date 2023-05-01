// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const indexClasses = "x-index";
const activeClasses = "x-active";

export interface PagingOpts {
  data: any[];
  count: number;
  limit: number;
  onChange: (index: number) => void;
  className?: string;
  defaultIndex?: number;
}

const Template = (
  { data, count, limit, onChange, className, defaultIndex = 1 }: PagingOpts,
  ref: ForwardedRef<any>
) => {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [totalPages, setTotalPages] = useState(Math.ceil(count / limit));
  const [startSlice, setStartSlice] = useState(currentIndex);
  const [endSlice, setEndSlice] = useState(currentIndex + 3);

  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(
      <a
        href="#"
        className={
          currentIndex == i + 1
            ? `${indexClasses} ${activeClasses}`
            : indexClasses
        }
        key={i}
        onClick={(e) => {
          e.preventDefault();
          onChange(i + 1);
          setCurrentIndex(i + 1);
        }}
      >
        {i + 1}
      </a>
    );
  }
  useEffect(() => {
    setCurrentIndex(1);
    setTotalPages(Math.ceil(count / limit));
  }, [count]);

  useEffect(() => {
    const startSlice_ =
      currentIndex - 2 >= 0
        ? currentIndex - 2
        : currentIndex - 1 >= 0
        ? currentIndex - 1
        : 1;
    const endSlice_ =
      currentIndex + 2 <= totalPages
        ? currentIndex + 2
        : currentIndex + 1 <= totalPages
        ? currentIndex + 1
        : totalPages;
    setStartSlice(startSlice_);
    setEndSlice(endSlice_);
  }, [totalPages, currentIndex]);

  return (
    <div ref={ref} className={className}>
      <div className="short-pagination">
        <a
          href="#"
          className="x-prev"
          onClick={(e) => {
            e.preventDefault();
            if (currentIndex > 0) {
              onChange(currentIndex - 1);
              setCurrentIndex(currentIndex - 1);
            }
          }}
        >
          Previous
        </a>
        <a
          href="#"
          className="x-next"
          onClick={(e) => {
            e.preventDefault();
            if (currentIndex < totalPages) {
              onChange(currentIndex + 1);
              setCurrentIndex(currentIndex + 1);
            }
          }}
        >
          Next
        </a>
      </div>
      <div className="long-pagination">
        <div className="x-info">
          <p>
            Showing{" "}
            <span>{data.length > 0 ? (currentIndex - 1) * limit + 1 : 0}</span>{" "}
            to <span>{(currentIndex - 1) * limit + data.length}</span> of{" "}
            <span>{count}</span> results
          </p>
        </div>
        <div className="x-numbers">
          <nav aria-label="Pagination">
            <a
              href="#"
              className="x-prev"
              onClick={(e) => {
                e.preventDefault();
                if (currentIndex > 1) {
                  onChange(currentIndex - 1);
                  setCurrentIndex(currentIndex - 1);
                }
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              <span>Previous</span>
              {/* <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" /> */}
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {currentIndex - 2 > 1 ? (
              <>
                {pages[0]}
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={indexClasses}
                >
                  ...
                </a>
              </>
            ) : null}

            {pages
              .slice(startSlice - 1 > 0 ? startSlice - 1 : 0, endSlice)
              .map((index) => index)}

            {currentIndex + 2 < totalPages ? (
              <>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={indexClasses}
                >
                  ...
                </a>
                {pages[totalPages - 1]}
              </>
            ) : null}
            <a
              href="#"
              className="x-next"
              onClick={(e) => {
                e.preventDefault();
                if (currentIndex < totalPages) {
                  onChange(currentIndex + 1);
                  setCurrentIndex(currentIndex + 1);
                }
              }}
            >
              <span>Next</span>
              <FontAwesomeIcon icon={faChevronRight} />
              {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

const Referable = forwardRef(Template);

export const Paging = styled(Referable)`
  ${tw`bg-white`}
  ${tw`px-4`}
  ${tw`py-3`}
  ${tw`flex`}
  ${tw`items-center`}
  ${tw`justify-between`}
  ${tw`border-t`}
  ${tw`border-gray-200`}
  ${tw`sm:px-6`}

  & > .short-pagination {
    ${tw`flex-1`}
    ${tw`flex`}
    ${tw`justify-between`}
    ${tw`sm:hidden`}
  }

  & > .short-pagination > .x-prev {
    ${tw`relative`}
    ${tw`inline-flex`}
    ${tw`items-center`}
    ${tw`px-4`}
    ${tw`py-2`}
    ${tw`border`}
    ${tw`border-gray-300`}
    ${tw`text-sm`}
    ${tw`font-medium`}
    ${tw`rounded-md`}
    ${tw`text-gray-700`}
    ${tw`bg-white`}
    ${tw`hover:bg-gray-50`}
  }

  & > .short-pagination > .x-next {
    ${tw`ml-3`}
    ${tw`relative`}
    ${tw`inline-flex`}
    ${tw`items-center`}
    ${tw`px-4`}
    ${tw`py-2`}
    ${tw`border`}
    ${tw`border-gray-300`}
    ${tw`text-sm`}
    ${tw`font-medium`}
    ${tw`rounded-md`}
    ${tw`text-gray-700`}
    ${tw`bg-white`}
    ${tw`hover:bg-gray-50`}
  }

  & > .long-pagination {
    ${tw`hidden`}
    ${tw`sm:flex-1!`}
    ${tw`sm:flex!`}
    ${tw`sm:items-center!`}
    ${tw`sm:justify-between!`}
  }

  & > .long-pagination > .x-info > p {
    ${tw`text-sm`}
    ${tw`text-gray-700`}
  }

  & > .long-pagination > .x-info > p > span {
    ${tw`font-medium`}
  }

  & > .long-pagination > .x-numbers > nav {
    ${tw`relative`}
    ${tw`z-0`}
    ${tw`inline-flex`}
    ${tw`rounded-md`}
    ${tw`shadow-sm`}
    ${tw`-space-x-px`}
  }

  & > .long-pagination > .x-numbers > nav > .x-prev {
    ${tw`relative`}
    ${tw`inline-flex`}
    ${tw`items-center`}
    ${tw`px-2`}
    ${tw`py-2`}
    ${tw`rounded-l-md`}
    ${tw`border`}
    ${tw`border-gray-300`}
    ${tw`bg-white`}
    ${tw`text-sm`}
    ${tw`font-medium`}
    ${tw`text-gray-500`}
    ${tw`hover:bg-gray-50`}
  }

  & > .long-pagination > .x-numbers > nav > .x-next {
    ${tw`relative`}
    ${tw`inline-flex`}
    ${tw`items-center`}
    ${tw`px-2`}
    ${tw`py-2`}
    ${tw`rounded-r-md`}
    ${tw`border`}
    ${tw`border-gray-300`}
    ${tw`bg-white`}
    ${tw`text-sm`}
    ${tw`font-medium`}
    ${tw`text-gray-500`}
    ${tw`hover:bg-gray-50`}
  }

  & > .long-pagination > .x-numbers > nav > .x-prev > span,
  & > .long-pagination > .x-numbers > nav > .x-next > span {
    ${tw`sr-only`}
  }

  & .x-index {
    ${tw`bg-white`}
    ${tw`border-gray-300`}
    ${tw`text-gray-500`}
    ${tw`hover:bg-gray-50`}
    ${tw`relative`}
    ${tw`inline-flex`}
    ${tw`items-center`}
    ${tw`px-4`}
    ${tw`py-2`}
    ${tw`border`}
    ${tw`text-sm`}
    ${tw`font-medium`}
  }

  & .x-active {
    ${tw`z-10`}
    ${tw`bg-indigo-50`}
    ${tw`border-indigo-500`}
    ${tw`text-indigo-600`}
    ${tw`hover:bg-indigo-50`}
  }

  & * {
    ${tw`font-sans`}
  }
`;
