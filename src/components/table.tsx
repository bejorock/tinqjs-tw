import styled from "styled-components";
import tw from "twin.macro";

const Table = styled.div`
  & > .row {
    ${tw`flex`}
    ${tw`gap-px`}
    ${tw`bg-white`}
  }

  & > .row:not(.header):hover {
    ${tw`bg-gray-400`}
    ${tw`bg-opacity-10`}
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
    ${tw`border-b`}
    ${tw`border-gray-300`}
    ${tw`border-opacity-30`}
  }

  & > .row > div:not(.stickyCol)::-webkit-scrollbar,
  & > .row > div.stickyCol > div::-webkit-scrollbar {
    display: none;
  }

  & > .row.header > div:not(.stickyCol),
  & > .row.header > div.stickyCol > div {
    ${tw`font-semibold`}
    ${tw`bg-gray-300`}
    ${tw`border-b`}
    ${tw`border-t`}
    ${tw`border-gray-500`}
    ${tw`border-opacity-20`}
  }

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
`;

export default Table;
