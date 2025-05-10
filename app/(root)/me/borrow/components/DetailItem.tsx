import { Borrow } from "@/model/Models";
import React from "react";
import Popup from "@/components/ReuseableComponents/Popup";
import BorrowDetailComponent from "@/components/ReuseableComponents/BorrowDetailComponent";

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
    <Popup open={open}>
      <BorrowDetailComponent onClose={onClose} borrow={borrow} />
    </Popup>
  );
};

export default DetailItem;
