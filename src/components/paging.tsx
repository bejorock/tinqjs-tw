// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const indexClasses =
  "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium";
const activeClasses =
  "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 hover:bg-indigo-50";

export interface PagingOpts {
  data: any[];
  count: number;
  limit: number;
  onChange: (index: number) => void;
}

export const Paging = ({ data, count, limit, onChange }: PagingOpts) => {
  const [currentIndex, setCurrentIndex] = useState(1);
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
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
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
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
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
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {data.length > 0 ? (currentIndex - 1) * limit + 1 : 0}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {(currentIndex - 1) * limit + data.length}
            </span>{" "}
            of <span className="font-medium">{count}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={(e) => {
                e.preventDefault();
                if (currentIndex > 1) {
                  onChange(currentIndex - 1);
                  setCurrentIndex(currentIndex - 1);
                }
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              <span className="sr-only">Previous</span>
              {/* <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" /> */}
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {currentIndex - 2 > 1 ? (
              <>
                {pages[0]}
                <label className={indexClasses}>...</label>
              </>
            ) : null}

            {pages
              .slice(startSlice - 1 > 0 ? startSlice - 1 : 0, endSlice)
              .map((index) => index)}

            {currentIndex + 2 < totalPages ? (
              <>
                <label className={indexClasses}>...</label>
                {pages[totalPages - 1]}
              </>
            ) : null}
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={(e) => {
                e.preventDefault();
                if (currentIndex < totalPages) {
                  onChange(currentIndex + 1);
                  setCurrentIndex(currentIndex + 1);
                }
              }}
            >
              <span className="sr-only">Next</span>
              <FontAwesomeIcon icon={faChevronRight} />
              {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};
