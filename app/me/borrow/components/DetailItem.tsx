import { Borrow } from "@/model/Models";
import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";
import NoImageFound from "../../../../public/images/no_image_found.jpg";

const DetailItem = ({
  open,
  onClose,
  borrow,
}: {
  open: boolean;
  onClose: () => void;
  borrow: Borrow | null;
}) => {
  return (
    <div
      className={`${
        open ? "top-0" : "top-[-100%]"
      } w-full h-screen bg-slate-950/80 px-5 fixed right-0 transition-all flex justify-center items-center z-2`}
    >
      <div className="flex flex-col w-150 h-150 bg-slate-950 rounded-2xl relative">
        <IoClose
          onClick={() => onClose()}
          className="text-4xl text-red-500 absolute z-1 top-2 right-2"
        />
        <div className="relative h-full max-h-[50%] w-full">
          <Image
            src={borrow?.item.picture || NoImageFound}
            className="object-cover rounded-t-2xl bg-amber-400"
            alt=""
            fill
          />
        </div>
        <div className="p-5 w-full flex-grow flex flex-col justify-between">
          <div className="">
            <h1 className="font-bold text-lg sm:text-2xl text-white">
              Details
            </h1>
            <table className="text-white w-full text-sm sm:text-[17px]">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td className="pr-1">:</td>
                  <td>{borrow?.item.name}</td>
                </tr>
                <tr>
                  <td>Type</td>
                  <td>:</td>
                  <td>{borrow?.item.type}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>:</td>
                  <td>{borrow?.item.category}</td>
                </tr>
                <tr>
                  <td>Borrow Date</td>
                  <td>:</td>
                  <td>
                    {borrow?.borrowDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }) || "Pending Confirmation"}
                  </td>
                </tr>
                <tr>
                  <td>Due Date</td>
                  <td>:</td>
                  <td>
                    {borrow?.dueDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }) || "Pending Confirmation"}
                  </td>
                </tr>
                <tr>
                  <td>Borrow Code</td>
                  <td>:</td>
                  <td>{borrow?.borrorCode || "Pending Confirmation"}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>:</td>
                  <td>{borrow?.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="px-5 py-1 bg-red-500 text-white font-bold rounded w-fit self-end">
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
