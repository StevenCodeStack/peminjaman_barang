"use client";
import React, { useState } from "react";
import BorrowReturnAccordion from "./BorrowReturnAccordion";
import { BorrowReturnWithBorrow } from "@/types/types";

const GridItems = ({ data }: { data: BorrowReturnWithBorrow[] }) => {
  const [expandedId, setExpandedId] = useState<string>("");

  return (
    <div className="space-y-2">
      {data.map((element) => (
        <BorrowReturnAccordion
          key={element.id}
          click={() =>
            setExpandedId(expandedId === element.id ? "" : element.id)
          }
          expandedId={expandedId}
          data={element}
        />
      ))}
    </div>
  );
};

export default GridItems;
