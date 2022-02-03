import { ForwardedRef } from "react";
import { OptionsItemArgs } from ".";

export declare type ColorOptionsItemArgs = {
  color: string;
} & Partial<OptionsItemArgs>;

const Template = (
  { onClick, className, color, children }: ColorOptionsItemArgs,
  ref: ForwardedRef<any>
) => {
  return (
    <a
      ref={ref}
      href="#"
      className={className}
      onClick={onClick}
      style={{ background: color }}
    >
      {children}
    </a>
  );
};
