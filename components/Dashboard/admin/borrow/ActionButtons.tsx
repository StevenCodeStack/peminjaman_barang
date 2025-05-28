"use client";
import Button from "@/components/ReuseableComponents/Button";
import { createBorrowReturn } from "@/lib/BorrowReturn";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ActionButtons = ({ borrowId }: { borrowId: string }) => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  async function handleClick() {
    setSubmitting(true);
    try {
      await createBorrowReturn(borrowId, "GOOD");
      toast("Success");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) toast("Failed : " + error.message);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="flex justify-center gap-5 px-3">
      <Button
        text="Return"
        variant="primary"
        click={() => handleClick()}
        disabledState={submitting}
      />
    </div>
  );
};

export default ActionButtons;
