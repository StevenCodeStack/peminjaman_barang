import Button from "@/components/ReuseableComponents/Button";
import { Borrow } from "@/model/Models";
import Image from "next/image";

const Item = ({
  right,
  borrow,
  onClick,
}: {
  right: boolean;
  borrow: Borrow | null;
  onClick: () => void;
}) => {
  if (borrow === null) {
    return null;
  }
  return (
    <div
      className={`${right && "relative md:left-1/2"} w-full md:max-w-1/2 px-6`}
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
        <div className="x-5 p-3 flex flex-col justify-between flex-grow">
          <div className="">
            <header className="flex justify-between p">
              <h1 className="text-xl font-bold">{borrow.item.name}</h1>
              <p className="text-sm">{borrow.item.category}</p>
            </header>
            <p className="font-light text-sm">{borrow.item.type}</p>
            <p className="text-yellow-400 font-semibold">{borrow.status}</p>
          </div>
          <div className="flex gap-5 mt-5 justify-between md:justify-start">
            {/* Change this to reuseable button later */}
            <button className="bg-red-400 px-5 py-1 rounded">Cancel</button>
            <Button click={onClick} variant="primary" text="Detail" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
