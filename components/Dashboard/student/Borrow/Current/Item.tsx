import Button from "@/components/ReuseableComponents/Button";
import { BorrowWithItem } from "@/types/types";
import Image from "next/image";

const Item = ({
  right,
  borrow,
  onClick,
}: {
  right: boolean;
  borrow: BorrowWithItem | null;
  onClick: () => void;
}) => {
  if (borrow === null) {
    return null;
  }

  let status = "";
  if (borrow.returnDate) {
    status = "Returned";
  } else if (borrow.dueDate < new Date()) {
    status = "Overdue";
  } else if (borrow.active) {
    status = "Active";
  }
  return (
    <div
      className={`${
        right && "relative md:left-1/2"
      } w-full md:max-w-1/2 md:px-6`}
    >
      <div className="bg-white p-3 px-5 rounded-2xl h-100 sm:h-120 flex flex-col">
        <div className="w-full max-h-[55%] sm:max-h-2/3 h-full relative">
          <Image
            src={borrow.item.picture}
            className="object-cover rounded-2xl"
            fill
            alt=""
          />
        </div>
        <div className="p-3 flex flex-col justify-between flex-grow">
          <div className="">
            <header className="flex justify-between p">
              <h1 className="text-xl font-bold">{borrow.item.name}</h1>
              <p className="text-sm">{borrow.item.category}</p>
            </header>
            <p className="font-light text-sm">{borrow.item.type}</p>
            <p
              className={`${
                status === "Active"
                  ? "text-green-400"
                  : status === "Overdue"
                  ? "text-yellow-400"
                  : "text-red-400"
              } font-semibold`}
            >
              {status}
            </p>
          </div>
          <Button
            click={onClick}
            variant="primary"
            text="Detail"
            className="w-fit"
          />
        </div>
      </div>
    </div>
  );
};

export default Item;
