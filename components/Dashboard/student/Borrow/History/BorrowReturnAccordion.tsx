import { BorrowReturnWithBorrow } from "@/types/types";
import React from "react";

const BorrowReturnAccordion = ({
  data,
  click,
  expandedId,
}: {
  data: BorrowReturnWithBorrow;
  click: () => void;
  expandedId: string;
}) => {
  return (
    <div
      key={data.id}
      className="border rounded-lg overflow-hidden transition-all"
    >
      <div
        className="p-3 flex justify-between cursor-pointer bg-primary hover:bg-primary-hover transition-all"
        onClick={click}
      >
        <h3 className="font-medium">{data.borrow.item.name}</h3>
        <span>{data.returnAt.toLocaleDateString("en-US")}</span>
      </div>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          expandedId === data.id ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-3 bg-white text-sm space-y-2">
            <p>
              <span className="font-semibold">Borrowed </span>:{" "}
              {data.borrow.createdAt?.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }) || "Pending Confirmation"}
            </p>
            <p>
              <span className="font-semibold">Returned</span>:{" "}
              {data.returnAt.toLocaleDateString("en-US")}
            </p>
            <p>
              <span className="font-semibold">Condition </span>: {data.status}
            </p>
            <p>
              <span className="font-semibold">Note </span>: {data.note}
            </p>
            <button className="mt-2 text-blue-500 hover:text-blue-700 transition-colors">
              Full report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowReturnAccordion;
