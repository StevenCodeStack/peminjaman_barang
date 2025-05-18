"use client";
import React from "react";
import RingProgress from "@/components/ReuseableComponents/RingProgress";
import Button from "@/components/ReuseableComponents/Button";
import { redirect } from "next/navigation";

const warning = 3;
const warningText = {
  good: `You currently have ${warning} out of 5 warnings. You're still in good standing.`,
  moderate: `You have received ${warning} out of 5 warnings. Continued violations may result in a borrowing ban.`,
  bad: `You have reached ${warning} out of 5 warnings. You are temporarily not allowed to borrow any items.`,
};

const WarningCard = () => {
  return (
    <div className="bg-white h-full w-full lg:w-75 xl:w-100 rounded-2xl flex flex-col justify-between p-5 gap-10">
      <div className="flex flex-col justify-center items-center">
        <RingProgress
          progress={warning / 5}
          size={200}
          strokeWidth={20}
          value={warning}
        />
        <h1 className="font-semibold text-2xl lg:text-base mt-5 text-center max-w-[90%]">
          {warning <= 2
            ? warningText.good
            : warning <= 4
            ? warningText.moderate
            : warningText.bad}
        </h1>
      </div>
      <Button
        text="View History"
        click={() => redirect("/dashboardTest/student/borrow/history")}
        variant="primary"
        className="self-end"
      />
    </div>
  );
};

export default WarningCard;
