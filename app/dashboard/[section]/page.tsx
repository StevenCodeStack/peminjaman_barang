import React from "react";
import MyBorrowedItems from "./components/(RightContent)/MyBorrowedItems";

const page = async ({ params }: { params: { section: string } }) => {
  const { section } = await params;
  return (
    <div className="flex-grow bg-white">
      {section === "borrowed_items" && <MyBorrowedItems />}
    </div>
  );
};

export default page;
