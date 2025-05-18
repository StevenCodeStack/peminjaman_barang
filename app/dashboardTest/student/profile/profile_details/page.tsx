import WarningCard from "@/components/Dashboard/student/Profile/WarningCard";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow flex flex-col lg:flex-row lg:max-h-[35%] bg-slate-100 gap-5 lg:gap-10 items-center px-15 py-5">
        <div className="h-50 w-50 relative">
          <Image
            src={
              "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            className="rounded-full object-cover"
            fill
            alt=""
          />
        </div>
        <div className="">
          <h1 className="font-bold text-2xl md:text-4xl">
            Steven Julius Hendry
          </h1>
          <p className="text-slate-600 mt-1">StevenCodestack</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-grow p-5 gap-5">
        <WarningCard />

        <div className="flex flex-col flex-grow gap-5">
          <div className="flex-grow lg:max-h-1/2 bg-white rounded-2xl p-5">
            <h1 className="text-2xl font-bold mb-2">Profile</h1>
            <div className="flex flex-col gap-1 text-lg">
              <p>Email : wahyupap9@gmail.com</p>
              <p>Class : 11 Grade</p>
              <p>Major : RPL</p>
            </div>
          </div>
          <div className="flex flex-col justify-between lg:max-h-1/2 bg-white rounded-2xl p-5 gap-5">
            <div className="bg-primary rounded-xl flex-grow p-2 px-5">
              <div className="text-2xl font-bold flex gap-3 justify-center items-center">
                <h1>Borrow Request</h1>
                <p>0</p>
              </div>
            </div>
            <div className="bg-blue-300 rounded-xl flex-grow p-2 px-5">
              <div className="text-2xl font-bold flex gap-3 justify-center items-center">
                <h1>Borrow</h1>
                <p>0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
