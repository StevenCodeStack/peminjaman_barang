"use client";
import Button from "@/components/ReuseableComponents/Button";
import React from "react";

const ActionButtons = ({ approve }: { approve: () => void }) => {
  return (
    <div className="flex justify-center gap-5 px-3">
      <Button text="Return" variant="primary" click={approve} />
    </div>
  );
};

export default ActionButtons;
