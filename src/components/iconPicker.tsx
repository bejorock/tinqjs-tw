import * as icons from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useState } from "react";
import { useSafe } from "../util/safe";

const iconNames = Object.keys(icons);

export declare type IconPickerOptions = {
  defaultValue?: any;
  onChange?: any;
};

const IconPicker = forwardRef(
  ({ defaultValue = null, onChange }: IconPickerOptions, ref: any) => {
    const [popup, setPopup] = useState(false);
    const [input, setInput] = useState(defaultValue); // {}
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

    useSafe(async () => {
      const tmp = [];
      for (let i = 0; i < iconNames.length; i++) {
        if (tmp.length >= 5) break;

        if (
          icons[iconNames[i]] &&
          typeof icons[iconNames[i]] === "object" &&
          icons[iconNames[i]].iconName
        ) {
          if (icons[iconNames[i]].iconName.includes(query)) {
            tmp.push(iconNames[i]);
          }
        }
        // console.log(icons[iconNames[i]]);
      }

      setData(tmp);
    }, [query]);

    return (
      <div className="relative w-full">
        <div className="relative x-input-container">
          <div
            className="mt-1 py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:text-sm border rounded-md border-gray-300 disabled:bg-gray-200 focus:ring-1 bg-white x-input-result"
            tabIndex={1}
            onClick={(e) => {
              setPopup(true);
            }}
          >
            <div className="flex items-center gap-2 x-input-result-item">
              {input ? (
                <>
                  <FontAwesomeIcon
                    icon={icons[input]}
                    className="text-base text-blue-400 block"
                  />
                  {icons[input].iconName}
                </>
              ) : (
                "none"
              )}
            </div>
          </div>

          {input !== null && input !== undefined && input !== "" ? (
            <a
              href="#"
              className="absolute top-2 right-3 text-gray-200 hover:text-gray-700 x-input-clear"
              onClick={(e) => {
                e.preventDefault();

                setInput(null);
                onChange(null);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </a>
          ) : null}
        </div>
        {/* <input type="hidden" name={name} value={defaultValue} ref={ref} /> */}
        {popup ? (
          <div className="absolute w-full mt-2 py-2 rounded-md shadow-lg text-gray-800 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 x-input-popup">
            <div className="field pb-2 px-2">
              <input
                type="text"
                autoFocus={true}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 disabled:bg-gray-200 rounded-md x-input-query"
                onBlur={() => {
                  setTimeout(() => {
                    setPopup(false);
                  }, 225);
                }}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </div>
            <div className="max-h-48 overflow-y-auto x-input-query-result">
              {data.map((d, i) => (
                <a
                  href="#"
                  className="flex gap-3 items-center w-full px-3 py-2 hover:bg-gray-100 text-sm hover:rounded-md break-words"
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();

                    setInput(d);
                    onChange(d);
                  }}
                >
                  <FontAwesomeIcon
                    icon={icons[d]}
                    className="text-base text-blue-400 block"
                  />
                  <div>{icons[d].iconName}</div>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);
export default IconPicker;
