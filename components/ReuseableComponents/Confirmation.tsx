"use client";
import { Item } from "@/model/Models";
import React from "react";
import WarningImg from "../../public/images/warning_sign.webp";
import Image from "next/image";

const Confirmation = ({
  open,
  item,
  message,
  onConfirm,
  onClose,
}: {
  open: boolean;
  item: Item | null;
  message: string;
  onConfirm: () => void;
  onClose: () => void | null;
}) => {
  return (
    <div
      className={`${
        open ? "top-0" : "top-[-100%]"
      } h-screen w-screen flex justify-center items-center absolute right-0 bg-slate-950/80 z-2 transition-all`}
    >
      <div className="bg-slate-950 p-10 px-15 rounded-2xl flex flex-col justify-center items-center gap-5">
        <div className="w-50 h-50 relative">
          <Image src={WarningImg} fill alt="" />
        </div>
        <p className="font-semibold text-xl text-white">{message}</p>
        <div className="text-white font-bold text-2xl flex gap-10">
          <button
            onClick={() => onConfirm()}
            className="px-5 py-1 rounded bg-green-400"
          >
            Confirm
          </button>
          <button
            onClick={() => onClose()}
            className="px-5 py-1 rounded bg-red-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
