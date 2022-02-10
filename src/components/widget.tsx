import {
  faCog,
  faCogs,
  faSave,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createContext,
  forwardRef,
  MutableRefObject,
  useContext,
  useState,
} from "react";
import styled from "styled-components";
import { Modal } from ".";
import { c } from "../util/click";
import { DashboardContext } from "./dashboard";
import tw from "twin.macro";

export declare type IWidgetContext = {
  mode: "view" | "edit";
  showConfig: boolean;
  withHeader: boolean;
  onCloseConfig: () => void;
  closeConfig: () => void;
  openConfig: () => void;
  destroy: () => void;
};

const defaultValue: IWidgetContext = {
  mode: "view",
  showConfig: false,
  withHeader: true,
  onCloseConfig: () => {},
  closeConfig: () => {},
  openConfig: () => {},
  destroy: () => {},
};

export const WidgetContext = createContext<IWidgetContext>(defaultValue);

export declare type WidgetConfigOpts = {
  children: any;
  className?: string;
};

const WidgetConfigTemplate = (
  { children, className }: WidgetConfigOpts,
  ref: MutableRefObject<any>
) => {
  const context = useContext(WidgetContext);

  return (
    <Modal
      ref={ref}
      show={context.showConfig}
      className={className}
      onClose={context.onCloseConfig}
    >
      <div style={{ zIndex: 100 }}>
        <div className=".x-widget-config-header">
          <h1>
            <FontAwesomeIcon icon={faCogs} />
            Widget Config
          </h1>
          <a href="#" onClick={c(context.closeConfig)}>
            <FontAwesomeIcon icon={faTimes} />
          </a>
        </div>
        {children}
      </div>
    </Modal>
  );
};

const WidgetConfigReferable = forwardRef(WidgetConfigTemplate);

export const WidgetConfig = styled(WidgetConfigReferable)`
  & .x-widget-config-header {
    ${tw`flex`}
    ${tw`justify-between`}
    ${tw`items-center`}
  }

  & .x-widget-config-header > h1 {
    ${tw`text-base`}
    ${tw`text-gray-800`}
    ${tw`font-semibold`}
    ${tw`flex`}
    ${tw`items-center`}
    ${tw`gap-2`}
  }

  & .x-widget-config-header > a {
    ${tw`text-gray-400`}
    ${tw`hover:text-gray-500`}
    ${tw`text-lg`}
  }
`;

//// Widget

export declare type IWidgetExtras = {
  buttons?: JSX.Element;
};

export declare type IWidgetOptions = {
  id: any;
  title?: string;
  withHeader?: boolean;
  transparent?: boolean;
  className?: string;
  extras?: IWidgetExtras;
  children: any;
};

export declare type IWidgetField = {
  id: string;
  type:
    | "text"
    | "number"
    | "date"
    | "datetime-local"
    | "tel"
    | "month"
    | "email"
    | "password"
    | "checkbox"
    | "radio"
    | "textarea"
    | "select"
    | "autocomplete";
  label: string;
  info?: string;
  defaultValue?: any;
  required?: boolean;
  data?:
    | { name: string; value: string }[]
    | ((query?: string) => {
        data: { name: string; value: string }[];
        count: number;
      });
  validate?: RegExp | ((value: any) => boolean);
};

export declare type IWidgetHeaderOptions = {
  title: string;
  extraButtons?: JSX.Element;
};

const WidgetMenuButtons = () => {
  const { withHeader, openConfig, destroy } = useContext(WidgetContext);
  const headerClass = withHeader ? "" : "no-header";

  return (
    <div className="x-menu-button">
      <a
        href="#"
        onClick={c(openConfig)}
        className={`x-menu-button ${headerClass}`}
      >
        <FontAwesomeIcon icon={faCog} />
      </a>
      <a
        href="#"
        onClick={c(destroy)}
        className={`x-menu-button ${headerClass}`}
      >
        <FontAwesomeIcon icon={faTimesCircle} />
      </a>
    </div>
  );
};

const WidgetHeader = ({
  title = "Widget",
  extraButtons,
}: IWidgetHeaderOptions) => {
  const { withHeader, mode } = useContext(WidgetContext);

  if (withHeader)
    return (
      <div className="x-widget-header">
        <h1 className="x-widget-title">{title}</h1>
        <div className="x-widget-buttons">
          {extraButtons}
          {mode === "edit" ? <WidgetMenuButtons /> : null}
        </div>
      </div>
    );

  if (mode === "edit")
    return (
      <div>
        <div className="x-wiget-header-transparent">
          <div>
            <div style={{ zIndex: 1000 }}>
              <div className="x-widget-buttons">
                {extraButtons}
                <WidgetMenuButtons />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return null;
};

const WidgetTemplate = (
  {
    id,
    title,
    withHeader = true,
    transparent = false,
    extras,
    className,
    children,
  }: IWidgetOptions,
  ref: MutableRefObject<any>
) => {
  const { mode, removeWidget } = useContext(DashboardContext);
  const [isConfigOpen, setConfigOpen] = useState(false);

  className = transparent ? `${className} transparent` : className;

  return (
    <WidgetContext.Provider
      value={{
        mode,
        withHeader,
        showConfig: isConfigOpen,
        openConfig: () => setConfigOpen(true),
        closeConfig: () => setConfigOpen(false),
        onCloseConfig: () => {},
        destroy: () => removeWidget(id),
      }}
    >
      <div ref={ref} className={className} style={{ zIndex: 1 }}>
        <div className="x-widget-container">
          <WidgetHeader title={title} extraButtons={extras?.buttons} />
          <div className="x-widget-body">{children}</div>
        </div>
      </div>
    </WidgetContext.Provider>
  );
};

const WidgetReferable = forwardRef(WidgetTemplate);

export const Widget = styled(WidgetReferable)`
  ${tw`rounded-md`}
  ${tw`flex-grow`}
  ${tw`w-full`}
  ${tw`h-full`}

  &:not(.transparent) {
    ${tw`shadow-md`}
  }

  & > .x-widget-container {
    ${tw`flex`}
    ${tw`flex-col`} 
    ${tw`h-full`}
  }

  & .x-menu-buttons {
    ${tw`flex`}
    ${tw`gap-3`}
  }

  & .x-menu-buttons .x-menu-button {
    ${tw`text-gray-500`}
    ${tw`hover:text-gray-600`}
    ${tw`text-lg`}
  }

  & .x-menu-buttons .x-menu-button.no-header {
    ${tw`text-white`}
    ${tw`hover:text-white`}
  }

  & > .x-widget-container .x-widget-header {
    ${tw`flex`}
    ${tw`justify-between`}
    ${tw`items-center`}
    ${tw`px-4`}
    ${tw`py-3`}
    ${tw`bg-gradient-to-b`}
    ${tw`from-gray-200`}
    ${tw`to-gray-300`}
    ${tw`rounded-t-md`}
    ${tw`border-b`}
    ${tw`border-gray-300`}
  }

  & > .x-widget-container .x-widget-header .x-widget-title {
    ${tw`text-lg`}
    ${tw`text-gray-600`}
    ${tw`font-semibold`}
  }

  & > .x-widget-container .x-widget-header .x-widget-buttons {
    ${tw`flex`}
    ${tw`justify-end`}
    ${tw`gap-3`}
  }

  & > .x-widget-container .x-widget-header-transparent {
    ${tw`relative`}
    ${tw`w-full`}
  }

  & > .x-widget-container .x-widget-header-transparent > div {
    ${tw`absolute`}
    ${tw`w-full`}
    ${tw`flex`}
    ${tw`justify-end`}
  }

  & > .x-widget-container .x-widget-header-transparent > div > div {
    ${tw`px-4`}
    ${tw`py-3`}
    ${tw`bg-black`}
    ${tw`bg-opacity-40`}
    ${tw`backdrop-filter`}
    ${tw`backdrop-blur`}
    ${tw`rounded-r-md`}
    ${tw`rounded-br-none`}
    ${tw`rounded-b-3xl`}
  }

  & > .x-widget-container .x-widget-body {
    ${tw`w-full`}
    ${tw`flex-grow`}
  }
`;
