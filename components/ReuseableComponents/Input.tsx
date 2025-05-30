import React from "react";

const Input = ({
  text,
  name,
  placeholder,
  defaultValue,
}: {
  text: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
}) => {
  return (
    <div className="flex flex-col gap-2 text-black">
      <label htmlFor="" className="font-semibold">
        {text}
      </label>
      <input
        type="text"
        defaultValue={defaultValue}
        name={name}
        placeholder={placeholder}
        className="bg-slate-100 px-4 py-1 rounded-2xl"
      />
    </div>
  );
};

export default Input;
