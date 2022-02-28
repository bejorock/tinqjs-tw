import styled from "styled-components";
import tw from "twin.macro";

export const Table = styled.div`
  & > .row {
    ${tw`flex`}
    ${tw`gap-px`}
    ${tw`bg-white`}
    ${tw`min-w-full`}
    ${tw`w-max`}
  }

  & > .row:not(.header):hover {
    ${tw`bg-gray-400`}
    ${tw`bg-opacity-10`}
  }

  & > .row > div.stickyCol.stickyLeft {
    ${tw`left-0`}
  }

  & > .row > div.stickyCol.stickyRight {
    ${tw`right-0`}
  }

  & > .row > div:not(.stickyCol),
  & > .row > div.stickyCol > div {
    ${tw`text-sm`}
    ${tw`text-gray-700`}
    ${tw`px-5`}
    ${tw`py-2`}
    ${tw`overflow-x-scroll`}
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  & > .row:not(.header) > div:not(.stickyCol),
  & > .row > div.stickyCol > div {
  }

  & > .row > div:not(.stickyCol)::-webkit-scrollbar,
  & > .row > div.stickyCol > div::-webkit-scrollbar {
    display: none;
  }

  & > .row:not(.header) {
    ${tw`border-b`}
    ${tw`border-gray-300`}
    ${tw`border-opacity-30`}
  }

  & > .row.header {
    ${tw`bg-gray-300`}
    ${tw`border-b`}
    ${tw`border-t`}
    ${tw`border-gray-500`}
    ${tw`border-opacity-20`}
  }

  & > .row.header > div:not(.stickyCol),
  & > .row.header > div.stickyCol > div {
    ${tw`font-semibold`}
  }

  & > .row > div.stickyCol {
    ${tw`flex`}
    ${tw`min-w-max`}
    ${tw`sticky`}
    ${tw`backdrop-filter`}
    ${tw`backdrop-blur`}
    ${tw`border-opacity-40`}
    ${tw`overflow-visible`}
    ${tw`gap-px`}
  }
`;

/*
  & > .row > div.stickyCol {
    ${tw`flex`}
    ${tw`min-w-max`}
    ${tw`sticky`}
    ${tw`bg-white`}
    ${tw`bg-opacity-20`}
    ${tw`backdrop-filter`}
    ${tw`backdrop-blur`}
    ${tw`border-opacity-40`}
    ${tw`overflow-visible`}
    ${tw`gap-px`}
  }
*/
