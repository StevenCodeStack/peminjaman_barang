import React from "react";

const Input = ({
  text,
  placeholder,
  name,
}: {
  text: string;
  placeholder: string;
  name: string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-lg">{text}</p>
      <input
        type="text"
        name={name}
        className="w-full bg-slate-100 py-1 px-4 rounded"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
