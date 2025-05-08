import { Borrow } from "@/model/Models";
import React from "react";

const DetailTable = ({ borrow }: { borrow: Borrow | null }) => {
  return (
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
  );
};

export default DetailTable;
