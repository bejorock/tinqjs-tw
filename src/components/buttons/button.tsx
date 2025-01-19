import styled from "styled-components";
import tw from "twin.macro";

export const Button = styled.button`
  ${tw`relative`}
  ${tw`flex`}
  ${tw`justify-center`}
  ${tw`py-2`}
  ${tw`px-4`}
  ${tw`border`}
  ${tw`border-transparent`}
  ${tw`text-sm`}
  ${tw`font-medium`}
  ${tw`rounded-md`}
  ${tw`text-white`}
  ${tw`focus:outline-none`}
  ${tw`focus:ring-2`}
  ${tw`focus:ring-offset-2`}
  ${tw`disabled:bg-gray-200`}
  ${tw`disabled:text-gray-500`}
  ${tw`disabled:cursor-not-allowed`}
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji !important";

  & * {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji !important";
  }

  & svg.animateIcon {
    ${tw`hidden`}
  }

  &.animate > svg.defaultIcon {
    ${tw`block`}
  }

  &.animate > svg.animateIcon {
    ${tw`hidden`}
  }

  &.animate:disabled > svg.defaultIcon {
    ${tw`hidden`}
  }

  &.animate:disabled > svg.animateIcon {
    ${tw`animate-spin`}
    ${tw`block`}
  }

  &.icon {
    ${tw`flex`}
    ${tw`justify-center`}
    ${tw`items-center`}
    ${tw`gap-1`}
  }
`;

export const PrimaryButton = styled(Button)`
  ${tw`bg-indigo-500`}
  ${tw`hover:bg-indigo-600`}
  ${tw`focus:ring-indigo-400`}
  ${tw`disabled:bg-gray-300`}
`;

export const SecondaryButton = styled(Button)`
  ${tw`bg-gray-500`}
  ${tw`hover:bg-gray-600`}
  ${tw`focus:ring-gray-400`}
  ${tw`disabled:bg-gray-300`}
`;

export const SuccessButton = styled(Button)`
  ${tw`bg-green-500`}
  ${tw`hover:bg-green-600`}
  ${tw`focus:ring-green-400`}
  ${tw`disabled:bg-gray-300`}
`;
export const DangerButton = styled(Button)`
  ${tw`bg-red-500`}
  ${tw`hover:bg-red-600`}
  ${tw`focus:ring-red-400`}
  ${tw`disabled:bg-gray-300`}
`;
export const WarningButton = styled(Button)`
  ${tw`bg-yellow-500`}
  ${tw`hover:bg-yellow-600`}
  ${tw`focus:ring-yellow-400`}
  ${tw`disabled:bg-gray-300`}
`;
export const InfoButton = styled(Button)`
  ${tw`bg-blue-500`}
  ${tw`hover:bg-blue-600`}
  ${tw`focus:ring-blue-400`}
  ${tw`disabled:bg-gray-300`}
`;

export const LightButton = styled(Button)`
  ${tw`bg-white`}
  ${tw`hover:bg-white`}
  ${tw`focus:ring-white`}
  ${tw`disabled:bg-gray-300`}
`;
export const DarkButton = styled(Button)`
  ${tw`bg-black`}
  ${tw`hover:bg-black`}
  ${tw`focus:ring-black`}
  ${tw`disabled:bg-gray-300`}
`;
