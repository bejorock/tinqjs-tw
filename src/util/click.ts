import { MouseEvent, MouseEventHandler } from "react";

export interface CType {
  (cb: Function): MouseEventHandler<any>;
}

export const c: CType = (cb: Function) => (e: MouseEvent<any>) => {
  e && e.preventDefault();

  cb();
};
