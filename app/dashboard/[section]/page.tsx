import React from "react";
import MyBorrowedItems from "./components/(RightContent)/MyBorrowedItems";
import MyReturnedItems from "./components/(RightContent)/MyReturnedItems";

const page = async ({ params }: { params: { section: string } }) => {
  const { section } = await params;
  return (
    <div className="flex-grow p-5">
      {section === "my_borrowed_items" && <MyBorrowedItems />}
      {section === "my_returned_items" && <MyReturnedItems />}
    </div>
  );
};

export default page;
