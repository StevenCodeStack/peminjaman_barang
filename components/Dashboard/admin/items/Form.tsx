"use client";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import NoImage from "@/public/images/no_image_found.jpg";
import Input from "@/components/ReuseableComponents/Input";
import { createItemAction, updateItemAction } from "@/app/actions/Item";
import { toast } from "react-toastify";
import { Item } from "@prisma/client";

const Form = ({ data }: { data?: Item }) => {
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!data) {
        const result = await createItemAction(
          new FormData(e.currentTarget),
          pictureUrl
        );
        if (result.success) {
          toast("Success");
        } else {
          toast.error(result.message);
        }
      } else {
        const result = await updateItemAction(
          new FormData(e.currentTarget),
          pictureUrl || data.picture
        );
        console.log(result);
        if (result.success) {
          toast("Success");
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast("Error : " + error.message);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-black p-8 px-10"
    >
      <input type="hidden" value={data?.id} name="id" />
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-grow flex flex-col gap-5">
          <Input
            name="name"
            placeholder="Fill the item name here..."
            text="Item Name"
            defaultValue={data?.name}
          />
          <Input
            name="type"
            placeholder="Fill the item type here..."
            text="Item Type"
            defaultValue={data?.type}
          />
          <Input
            name="category"
            placeholder="Fill the item category here..."
            text="Item Category"
            defaultValue={data?.category}
          />
          <div className="flex items-center gap-2">
            <label htmlFor="">Status</label>
            <select
              name="status"
              defaultValue={
                data?.isDamaged
                  ? "damaged"
                  : data?.isAvailable
                  ? "active"
                  : "inactive"
              }
              className="bg-slate-100 px-2"
            >
              <option className="hidden">Choose Status</option>
              <option value="active">Active</option>
              <option value="inactive">InActive</option>
              {data && <option value="damaged">Damaged</option>}
            </select>
          </div>
          <button
            className="w-fit px-6 py-1 font-semibold rounded bg-primary"
            type="submit"
          >
            Submit
          </button>
        </div>
        <div className="flex-grow flex flex-col gap-5">
          <div className="relative aspect-[1.5/1] h-48 w-fit">
            <Image
              src={pictureUrl || data?.picture || NoImage}
              fill
              className="object-cover rounded"
              alt=""
            />
          </div>
          <CldUploadWidget
            uploadPreset="peminjaman_barang"
            options={{
              sources: ["local", "unsplash", "camera"],
              multiple: false,
              resourceType: "image",
              cropping: true,
              showAdvancedOptions: true,
            }}
            onSuccess={(result) => {
              if (!result.info) return;
              setPictureUrl((result.info as { secure_url: string }).secure_url);
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="w-fit bg-primary hover:bg-primary-hover rounded px-6 py-1 font-semibold"
              >
                {pictureUrl ? "Image Uploaded" : "Upload Image"}
              </button>
            )}
          </CldUploadWidget>
        </div>
      </div>
    </form>
  );
};

export default Form;
