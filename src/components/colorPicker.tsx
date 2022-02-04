import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useState } from "react";
import { useSafe } from "../util/safe";
import colors from "tailwindcss/colors";

// console.log(x);

// const colors = require("tailwindcss/colors");

export declare type ColorPickerOptions = {
  defaultValue?: any;
  onChange?: any;
};

const ColorPicker = forwardRef(
  ({ defaultValue = null, onChange }: ColorPickerOptions, ref: any) => {
    const [popup, setPopup] = useState(false);
    const [input, setInput] = useState(defaultValue);
    const [data, setData] = useState([]);

    useSafe(async () => {
      const data_ = [];

      for (let c in colors) {
        if (typeof colors[c] !== "function") {
          if (typeof colors[c] !== "object") data_.push([colors[c]]);
          else {
            const tmp = [];
            for (let variant in colors[c]) {
              tmp.push(colors[c][variant]);
            }

            data_.push(tmp);
          }
        }
      }

      // console.log(data_);

      setData(data_);
    }, []);

    return (
      <div className="relative w-full">
        <div className="relative x-input-container">
          <div
            className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border rounded-md border-gray-300 disabled:bg-gray-200 focus:ring-1 bg-white x-input-result"
            tabIndex={1}
            onClick={(e) => {
              setPopup(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setPopup(false);
              }, 225);
            }}
          >
            <div className="flex items-center gap-2 x-input-result-item">
              <div
                className="border border-gray-400 w-10 bg-transparent"
                style={input ? { background: input } : {}}
              >
                &nbsp;
              </div>
              {input ? input : "none"}
            </div>
          </div>

          {input !== null && input !== undefined && input !== "" ? (
            <a
              href="#"
              className="absolute top-2 right-3 text-gray-200 hover:text-gray-700 x-input-clear"
              onClick={(e) => {
                e.preventDefault();

                setInput("");
                onChange(null);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </a>
          ) : null}
        </div>
        {/* <input type="hidden" name={name} value={defaultValue} ref={ref} /> */}
        {popup ? (
          <div className="absolute w-full mt-2 max-h-56 overflow-y-scroll py-2 rounded-md shadow-lg text-gray-800 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 x-input-popup">
            {data.map((d, i) => (
              <div key={i} className="grid grid-cols-10 gap-1 my-1 mx-1">
                {d.map((dd, j) => (
                  <a
                    href="#"
                    className="w-full h-full border border-gray-300 hover:border-gray-700 text-sm hover:rounded-md "
                    key={i + ":" + j}
                    onClick={(e) => {
                      e.preventDefault();

                      setInput(dd);
                      onChange(dd);
                    }}
                    style={{ background: dd }}
                  >
                    &nbsp;
                  </a>
                ))}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
export default ColorPicker;
