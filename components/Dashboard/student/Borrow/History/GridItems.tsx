"use client";
import React, { useState } from "react";
import BorrowReturnAccordion from "./BorrowReturnAccordion";
import { BorrowReturnWithBorrow } from "@/types/types";

const GridItems = ({ data }: { data: BorrowReturnWithBorrow[] }) => {
  const [expandedId, setExpandedId] = useState<string>("");

  return (
    <div className="space-y-2">
      {data.length > 0 ? (
        data.map((element) => (
          <BorrowReturnAccordion
            key={element.id}
            click={() =>
              setExpandedId(expandedId === element.id ? "" : element.id)
            }
            expandedId={expandedId}
            data={element}
          />
        ))
      ) : (
        <h1>No Data...</h1>
      )}
    </div>
  );
};

export default GridItems;
