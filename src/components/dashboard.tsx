import { createContext, forwardRef, MutableRefObject } from "react";
import styled from "styled-components";

export interface IDashboardContext {
  mode: "view" | "edit";
  widgets: any[];
  removeWidget?: (id: number) => void;
  loadMetadata?: (id: number) => any;
  saveMetadata?: (id: number, data: any) => void;
}

const defaultValue: IDashboardContext = {
  mode: "view",
  widgets: [],
  removeWidget: () => {},
  loadMetadata: () => {},
  saveMetadata: () => {},
};

export const DashboardContext = createContext<IDashboardContext>(defaultValue);

export interface DashboardOpts {
  children: any;
  className?: string;
}

const Template = ({ className, children }, ref: MutableRefObject<any>) => {
  return (
    <DashboardContext.Provider value={defaultValue}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </DashboardContext.Provider>
  );
};

const Referable = forwardRef(Template);

export const Dashboard = styled(Referable);
