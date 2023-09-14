import { roboto } from "@/pages/_app";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  title: string;
  inputs: {
    label: string;
    placeholder: string;
    onChange: any;
    defaultValue?: string;
    type?: string;
  }[];
  onCancel: any;
  onSave: any;
};

const UpdateModal: React.FC<Props> = ({ title, inputs, onCancel, onSave }) => {
  return (
    <div className="modal">
      <div className="bg-[var(--neutral-10)] rounded-lg p-4 grid w-[80vw] max-w-[500px] max-h-fit">
        <div className="grid w-full gap-2 md:gap-4">
          <div className="flex w-full items-center justify-end">
            <AiOutlineClose size={24} onClick={onCancel} />
          </div>
          <div className="flex w-full items-center">
            <p
              className={`${roboto.className} text-[var(--gray-800)] font-semibold text-lg md:text-xl px-1`}
            >
              {title}
            </p>
          </div>
          {inputs.map((input, key) => {
            const inputType = input?.type ? input.type : "text";
            return (
              <div className="grid" key={key}>
                <label
                  className={`${roboto.className} text-[var(--gray-800)] font-normal text-lg px-1`}
                >
                  {input.label}
                </label>
                <input
                  placeholder={input.placeholder}
                  onChange={input.onChange}
                  className="border-2 rounded-lg w-full p-2"
                  defaultValue={input?.defaultValue}
                  type={inputType}
                />
              </div>
            );
          })}

          <div className="w-full flex gap-4 items-center justify-end">
            <button className="btn-link font-semibold" onClick={onCancel}>
              Cancel
            </button>
            <button className="btn-primary" onClick={onSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
