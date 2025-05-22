"use client";
import React from "react";
import Input from "@/components/ReuseableComponents/Input";
import { updateUserName } from "@/lib/User";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";

const Page = () => {
  const { isLoaded, isSignedIn, userId } = useAuth();
  if (!isLoaded) return null;
  if (!isSignedIn) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userId) return null;
    try {
      await updateUserName(new FormData(e.currentTarget), userId);
      toast("Success!");
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      }
    }
  }
  return (
    <div className="h-[100dvh] w-full flex justify-center items-center">
      <div className="p-8 px-10 bg-white rounded-xl min-w-100 md:min-w-120">
        <h1 className="text-4xl font-bold">Complete Profile</h1>
        <div className="w-full rounded-2xl bg-black h-1 my-3"></div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <Input text="NIK" name="nik" placeholder="Fill your NIK here.." />
          <Input
            text="Class"
            name="class"
            placeholder="Fill your Class here.."
          />
          <Input
            text="Major"
            name="major"
            placeholder="Fill your Major here.."
          />
          <button className="w-fit px-5 py-1 rounded bg-slate-200">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
