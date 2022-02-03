import { useEffect, useMemo, useState } from "react";

export declare type ITableColumn = {
  name: string;
  key?: any;
  feature?: string;
  style?: string;
  width?: number;
};

export declare type ITableItem = {
  value: string;
};

export declare type UseTableOpts = {
  columns: (string | ITableColumn)[];
  data: any[];
  settings?: ITableSettings;
};

export declare type ITableProps = {
  className?: string;
  style?: any;
  [key: string]: any;
};

/* export declare type ITableHeader = {
  getProps: (options?: ITableProps) => ITableProps;
  val: any;
}; */

export declare type ITableBody = {
  getProps: (options?: ITableProps) => ITableProps;
  rows: ITableRow[];
};

export declare type ITableRow = {
  getProps: (options?: ITableProps) => ITableProps;
  renderCell: (cellEl: (cell: ITableCell, i: number) => any) => any;
};

export declare type ITableCell = {
  getProps: (options?: ITableProps) => ITableProps;
  val: any;
  // key: string;
};

export declare type ITableFeature = {
  base?: string;
  stickyLeft?: boolean;
  stickyRight?: boolean;
  sortable?: boolean;
  formatter?: (value: any) => any;
  validator?: (value: any) => boolean;
};

export declare type ITableStyle = {
  classes: string[];
  variants?: {
    [key: string]: string[];
  };
};

export declare type ITableSettings = {
  features?: {
    [key: string]: ITableFeature | string;
  };
  styles?: {
    [key: string]: ITableStyle;
  };
};

export default function useTable({
  columns,
  data,
  settings = {},
}: UseTableOpts) {
  const features = useMemo(() => {
    if (!settings) return {};

    const tmp = {} as { [key: string]: ITableFeature };

    for (let key in settings.features) {
      let f =
        typeof settings.features[key] === "string"
          ? ({ base: settings.features[key] } as ITableFeature)
          : (settings.features[key] as ITableFeature);

      if (f.base) {
        let base = f.base;

        while (!!base && settings.features[base]) {
          const baseF =
            typeof settings.features[base] === "string"
              ? ({ base: settings.features[base] } as ITableFeature)
              : (settings.features[base] as ITableFeature);

          f = { ...baseF, ...f };

          base = baseF.base;
        }
      }

      tmp[key] = f;
    }

    return tmp;
  }, [settings]);

  const headers: ITableRow = useMemo(() => {
    const stickyLeft = [];
    const stickyRight = [];
    const nonSticky = [];

    for (let l of columns) {
      const { key, name, feature, style, width } =
        typeof l === "string"
          ? ({ name: l } as ITableColumn)
          : (l as ITableColumn);

      const tmp: ITableCell = {
        // key,
        val: name,
        getProps: (options: ITableProps = {}) => ({
          className: options.className,
          style: { width: width ? width + "px" : "80px", ...options.style },
        }),
      };

      if (feature && features[feature]) {
        const f = features[feature];

        if (f.stickyLeft) stickyLeft.push(tmp);
        else if (f.stickyRight) stickyRight.push(tmp);
        else nonSticky.push(tmp);

        tmp.getProps = (options: ITableProps = {}) => ({
          className: f.sortable
            ? `cursor-pointer ${options.className}`
            : options.className,
          style: { width: width ? width + "px" : "80px", ...options.style },
        });

        // if (f.sortable) tmp.className = ["cursor-pointer"];
        // if(f.sortable) ignore this for now
      } else nonSticky.push(tmp);

      // ignore styles for now

      // update width
      // if (width) tmp.style.width = width + "px";
    }

    // if (stickyLeft.length > 0) nonSticky.unshift(stickyLeft);
    // if (stickyRight.length > 0) nonSticky.push(stickyRight);

    return {
      getProps: (options = {}) => ({
        className: `row header min-w-full w-max ${options.className}`,
        style: { ...options.style },
      }),

      renderCell: (cellEl) => {
        const tmp = [];
        let counter = 0;

        if (stickyLeft.length > 0) {
          tmp.unshift(
            <div className="stickyCol left-0" key={counter++}>
              {stickyLeft.map((h, i) => cellEl(h, counter++))}
            </div>
          );
        }

        for (let h of nonSticky) {
          tmp.push(cellEl(h, counter++));
        }

        if (stickyRight.length > 0) {
          tmp.push(
            <div className="stickyCol right-0" key={counter++}>
              {stickyRight.map((h, i) => cellEl(h, counter++))}
            </div>
          );
        }

        return tmp;
      },
    };
  }, [columns, features]);

  const body: ITableBody = useMemo(() => {
    const tmpData = [] as ITableRow[];

    for (let d of data) {
      const stickyLeft = [];
      const stickyRight = [];
      const nonSticky = [];
      let counter = 0;

      for (let l of columns) {
        const { feature, style, width, key } =
          typeof l === "string" ? ({} as ITableColumn) : (l as ITableColumn);

        const tmp: ITableCell = {
          val: key ? d[key] : d,
          getProps: (options: ITableProps = {}) => ({
            className: options.className,
            style: { width: width ? width + "px" : "80px", ...options.style },
          }),
        };

        if (feature && features[feature]) {
          const f = features[feature] as ITableFeature;

          if (f.stickyLeft) stickyLeft.push(tmp);
          else if (f.stickyRight) stickyRight.push(tmp);
          else nonSticky.push(tmp);

          if (f.formatter) tmp.val = f.formatter(d[key]);
          if (f.validator) tmp.val = f.validator(d[key]) ? tmp.val : null;

          // console.log(tmp.val);
        } else nonSticky.push(tmp);
      }

      // if (stickyLeft.length > 0) nonSticky.unshift(stickyLeft);
      // if (stickyRight.length > 0) nonSticky.push(stickyRight);

      const tmpRow: ITableRow = {
        renderCell: (cellEl) => {
          const tmp = [];

          if (stickyLeft.length > 0) {
            tmp.unshift(
              <div className="stickyCol left-0" key={counter++}>
                {stickyLeft.map((h, i) => cellEl(h, counter++))}
              </div>
            );
          }

          for (let h of nonSticky) {
            tmp.push(cellEl(h, counter++));
          }

          if (stickyRight.length > 0) {
            tmp.push(
              <div className="stickyCol right-0" key={counter++}>
                {stickyRight.map((h, i) => cellEl(h, counter++))}
              </div>
            );
          }

          return tmp;
        },
        getProps: (options = {}) => ({
          className: `row min-w-full w-max ${options.className}`,
          style: { ...options.style },
        }),
      };

      tmpData.push(tmpRow);
    }

    return {
      getProps: (options = {} as ITableProps) => ({
        className: options.className,
        style: { ...options.style },
      }),

      rows: tmpData,
    };
  }, [data, features]);

  return { headers, body };
}
