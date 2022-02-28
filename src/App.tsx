import React, { useMemo, useRef, useState } from "react";

import faker from "faker";

import {
  ColorPicker,
  IconPicker,
  MultiComplete,
  TextComplete,
} from "./components";
import styled from "styled-components";
import tw from "twin.macro";
import { useTable } from "./hooks/useTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table } from "./components/table";
import useAutoComplete from "./hooks/useAutoComplete";
import useMultiComplete from "./hooks/useMultiComplete";
import { useModal } from "./controllers/modal/useModal";
import { Modal } from "./components/modal/modal";
import { IAutoCompleteValue } from "./components/dropdown";

const Button = styled.button`
  ${tw`bg-red-200`}
`;

function generateData() {
  const tmp = [];

  for (let i = 0; i < 20; i++) {
    tmp.push({
      id: i + 1,
      nama: faker.name.findName(),
      invoiceNo: faker.random.alphaNumeric(8),
      trxAmount: faker.datatype.number(),
      paymentAmount: faker.datatype.number(),
      expiredDate: faker.datatype.datetime(),
      status: faker.helpers.randomize([1, 2, 4, 8]),
    });
  }

  return tmp;
}

const dateFormat = new Intl.DateTimeFormat("id", {
  dateStyle: "full",
} as any);

const GreetComponent_ = ({ className = "" }) => (
  <div className={className}>
    Hello <span>World</span>
  </div>
);

const GreetComponent = styled(GreetComponent_)`
  ${tw`text-red-600`}

  & > span {
    ${tw`text-green-400`}
  }
`;

const GreetComponentCustom = styled(GreetComponent)`
  ${tw`underline`}
`;

function App() {
  const autoRef = useRef();
  const multiRef = useRef();
  const colorRef = useRef();
  const iconRef = useRef();

  const ac = useAutoComplete(async (query = "", existingVal) => {
    return ["Entry 1", "Entry 2", "Entry 3"]
      .filter((f) => f !== existingVal)
      .filter((f) => f.includes(query));
  });

  const mc = useMultiComplete(async (query = "", existingVals = []) => {
    return ["Entry 1", "Entry 2", "Entry 3"]
      .filter((f) => f.includes(query))
      .filter((f) => existingVals.findIndex((ff) => f === ff.id) == -1);
  });

  const columns = useMemo(
    () => [
      { name: "No.", key: "id", feature: "stickyLeft", width: 50 },
      { name: "Nama", key: "nama", feature: "stickyLeft", width: 350 },
      { name: "Invoice No.", key: "invoiceNo", width: 200 },
      { name: "Total Tagihan", key: "trxAmount", width: 200 },
      { name: "Total Pembayaran", key: "paymentAmount", width: 200 },
      {
        name: "Tanggal Kadaluarsa",
        key: "expiredDate",
        feature: "expiredDate",
        width: 220,
      },
      {
        name: "Status Kirim",
        feature: "statusKirim",
        key: "status",
        width: 200,
      },
      { name: "Status Dibayarkan", key: "status", width: 200 },
      { name: "Status Lunas", key: "status", width: 200 },
      { name: "Status Selesai", key: "status", width: 200 },
      { name: "", feature: "action", width: 100 },
    ],
    []
  );
  const data = useMemo(() => generateData(), []);

  const { headers, body } = useTable({
    columns,
    data,
    settings: {
      features: {
        stickyLeft: {
          stickyLeft: true,
          sortable: true,
        },

        expiredDate: {
          formatter: (value: Date) => dateFormat.format(value),
        },

        action: {
          stickyRight: true,
          sortable: true,
          formatter: (value: any) => (
            <div className="flex gap-2 justify-end">
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <FontAwesomeIcon icon={faEdit} />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-500">
                <FontAwesomeIcon icon={faTrash} />
              </a>
            </div>
          ),
        },

        statusKirim: {
          formatter: (value: any) =>
            (value & 1) == 1 ? "Terkirim" : "Belum Dikirim",
        },
      },
    },
  });

  const modalController = useModal();

  const [sampleValue, setSampleValue] = useState(
    null as IAutoCompleteValue<string>
  );
  const sampleData: IAutoCompleteValue<string>[] = [
    {
      id: 1,
      content: "Hello",
    },
    {
      id: 2,
      content: "World",
    },
    {
      id: 3,
      content: "Greet",
    },
  ];
  const querySampleData = async (keywords) =>
    sampleData
      .filter((sd) => (sampleValue ? sd.id != sampleValue.id : true))
      .filter((sd) => sd.content.includes(keywords));

  return (
    <>
      <GreetComponent />
      <GreetComponentCustom />
      <div className="grid grid-cols-8 gap-3 p-10">
        <div className="field">
          <label>Sample Auto Complete</label>
          <TextComplete
            onChange={(val) => {
              console.log(val);
              setSampleValue(val);
            }}
            onQuery={querySampleData}
          />
          {/* <AutoComplete
            ref={autoRef}
            control={ac.control}
            onChange={(value) => {
              console.log(value);
            }}
          >
            {ac.options.map((opt, i) => (
              <a
                href="#"
                className="block w-full px-3 py-2 hover:bg-gray-300 text-sm hover:rounded-md break-words"
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  ac.select(opt, opt);
                }}
              >
                {opt}
              </a>
            ))}
          </AutoComplete> */}
        </div>

        <div className="field">
          <label>Sample Multi Complete</label>
          <MultiComplete
            ref={multiRef}
            control={mc.control}
            onChange={(value) => {
              console.log(value);
            }}
          >
            {mc.options.map((opt, i) => (
              <a
                href="#"
                className="block w-full px-3 py-2 hover:bg-gray-100 text-sm hover:rounded-md break-words"
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  mc.select(opt, opt);
                }}
              >
                {opt}
              </a>
            ))}
          </MultiComplete>
        </div>

        <div className="field">
          <label>Sample Color Picker</label>
          <ColorPicker
            ref={colorRef}
            onChange={(value) => {
              console.log(value);
            }}
          />
        </div>

        <div className="field">
          <label>Sample Icon Picker</label>
          <IconPicker ref={iconRef} onChange={(value) => console.log(value)} />
        </div>

        <div className="field">
          <Button>Click Me</Button>
        </div>

        <div className="field">
          {/* <Modal control={modalController.control}>
            <div className="bg-white">Hello world</div>
          </Modal> */}
          <Button onClick={modalController.open}>Click Me</Button>
        </div>
      </div>

      <div className="px-10">
        <div className="w-full overflow-y-auto">
          <Table>
            <div {...headers.getProps()}>
              {headers.renderCell((th, i) => (
                <div key={i} {...th.getProps()}>
                  {th.val}
                </div>
              ))}
            </div>
            {body.rows.map((row, i) => (
              <div key={i} {...row.getProps()}>
                {row.renderCell((td, j) => (
                  <div key={j} {...td.getProps()}>
                    {td.val}
                  </div>
                ))}
              </div>
            ))}
          </Table>
        </div>
      </div>
    </>
  );
}

export default App;
