import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";
import NoImageFound from "../../public/images/no_image_found.jpg";
import { BorrowWithItem } from "@/types/types";

const BorrowDetailComponent = ({
  borrow,
  onClose,
}: {
  borrow: BorrowWithItem | null;
  onClose: () => void;
}) => {
  if (borrow === null) {
    return;
  }
  let status = "";
  if (borrow.returnDate) {
    status = "Returned";
  } else if (borrow.dueDate < new Date()) {
    status = "Overdue";
  } else if (borrow.active) {
    status = "Active";
  }
  return (
    <div className="flex flex-col w-100 sm:w-150 h-150 bg-slate-950 rounded-2xl relative">
      <IoClose
        onClick={() => onClose()}
        className="text-4xl text-red-500 absolute z-1 top-2 right-2"
      />
      <div className="relative h-full max-h-[50%] w-full">
        <Image
          src={borrow?.item?.picture || NoImageFound}
          className="object-cover rounded-t-2xl bg-amber-400"
          alt=""
          fill
        />
      </div>
      <div className="p-5 w-full flex-grow">
        <h1 className="font-bold text-lg sm:text-2xl text-white">Details</h1>
        <table className="text-white w-full text-sm sm:text-[17px]">
          <tbody>
            <tr>
              <td>Name</td>
              <td className="pr-1">:</td>
              <td>{borrow.item.name}</td>
            </tr>
            <tr>
              <td>Type</td>
              <td>:</td>
              <td>{borrow.item.type}</td>
            </tr>
            <tr>
              <td>Category</td>
              <td>:</td>
              <td>{borrow.item.category}</td>
            </tr>
            <tr>
              <td>Borrow Date</td>
              <td>:</td>
              <td>
                {borrow.createdAt.toLocaleDateString("en-US", {
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
                {borrow.dueDate.toLocaleDateString("en-US", {
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
              <td>{borrow.borrowCode || "Pending Confirmation"}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>:</td>
              <td>{status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowDetailComponent;
