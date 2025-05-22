"use client";
import { ItemWithBorrowAndUser } from "@/types/types";
import React, { useState } from "react";
import Item from "./Item";
import Image from "next/image";
import Popup from "@/components/ReuseableComponents/Popup";
import { IoMdClose } from "react-icons/io";
import NoImageFound from "@/public/images/no_image_found.jpg";
import { dateFormat } from "@/lib/utils";

const GridItems = ({ data }: { data: ItemWithBorrowAndUser[] }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<ItemWithBorrowAndUser | null>(null);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-10 mb-5">
        {data.map((element) => (
          <Item
            key={element.id}
            data={element}
            click={() => {
              setSelectedItem(element);
              setOpen(true);
            }}
          />
        ))}
      </div>
      <Popup open={open}>
        <div className="bg-slate-900 rounded-2xl relative flex flex-col w-100 md:w-120 h-100 md:h-120 overflow-hidden">
          <IoMdClose
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-red-500 text-2xl font-bold z-1"
          />
          <div className="w-full h-full max-h-1/2 relative self-center">
            <Image
              src={selectedItem?.picture || NoImageFound}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <table className="text-white mt-5 mx-5">
            <tbody>
              <tr>
                <td>Name</td>
                <td>:</td>
                <td>{selectedItem?.name || "No Name"}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>:</td>
                <td>{selectedItem?.category || "No Category"}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>:</td>
                <td>{selectedItem?.type || "No Type"}</td>
              </tr>
              <tr>
                <td>Available</td>
                <td>:</td>
                <td>
                  {selectedItem?.isAvailable ? "Available" : "Not Available"}
                </td>
              </tr>
              {selectedItem?.borrow[0] ? (
                <>
                  <tr>
                    <td>Borrowed By</td>
                    <td>:</td>
                    <td>
                      {selectedItem.borrow[0].user.fullName ||
                        "No Name" +
                          " / " +
                          (selectedItem.borrow[0].user.student.nik || "No NIK")}
                    </td>
                  </tr>
                  <tr>
                    <td>Borrowed At</td>
                    <td>:</td>
                    <td>
                      {dateFormat(selectedItem.borrow[0].createdAt ?? null)}
                    </td>
                  </tr>
                </>
              ) : (
                selectedItem?.borrowRequest[0] && (
                  <>
                    <tr>
                      <td>Requested By</td>
                      <td>:</td>
                      <td>
                        {selectedItem.borrowRequest[0].user.fullName ||
                          "No Name" +
                            " / " +
                            (selectedItem.borrowRequest[0].user.student.nik ||
                              "No NIK")}
                      </td>
                    </tr>
                    <tr>
                      <td>Requested At</td>
                      <td>:</td>
                      <td>
                        {dateFormat(
                          selectedItem.borrowRequest[0].createdAt ?? null
                        )}
                      </td>
                    </tr>
                  </>
                )
              )}
            </tbody>
          </table>
        </div>
      </Popup>
    </>
  );
};

export default GridItems;
