"use client";
import React from "react";
import WarningImg from "../../public/images/warning_sign.webp";
import Image from "next/image";
import Button from "./Button";

const Confirmation = ({
  message,
  onConfirm,
  onClose,
}: {
  message: string;
  onConfirm: () => void;
  onClose: () => void | null;
}) => {
  return (
    <div className="bg-slate-950 p-10 px-15 rounded-2xl flex flex-col justify-center items-center gap-5">
      <div className="w-50 h-50 relative">
        <Image src={WarningImg} fill alt="" />
      </div>
      <p className="font-semibold text-xl text-white">{message}</p>
      <div className="text-white font-bold text-2xl flex gap-10">
        <Button
          click={() => {
            onConfirm();
            onClose();
          }}
          text="Confirm"
          variant="primary"
        />
        <Button
          className="!text-black"
          click={onClose}
          text="Cancel"
          variant="danger"
        />
      </div>
    </div>
  );
};

export default Confirmation;
