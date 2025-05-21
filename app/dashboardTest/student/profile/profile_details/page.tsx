import WarningCard from "@/components/Dashboard/student/Profile/WarningCard";
import prisma from "@/config/PrismaClient";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      student: true,
      admin: true,
    },
  });
  if (!user) return null;

  const borrowRequestCount = await prisma.borrowRequest.count({
    where: { userId: userId },
  });
  const borrowCount = await prisma.borrow.count({
    where: { userId: userId },
  });

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow flex flex-col lg:flex-row lg:max-h-[35%] bg-slate-100 gap-5 lg:gap-10 items-center px-15 py-5">
        <div className="h-50 w-50 relative">
          <Image
            src={user.picture}
            className="rounded-full object-cover"
            fill
            alt=""
          />
        </div>
        <div className="">
          <h1 className="font-bold text-2xl md:text-4xl">{user.fullName}</h1>
          <p className="text-slate-600 mt-1">
            {user.username || "No Username"}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-grow p-5 gap-5">
        <WarningCard warning={user.student?.warning || 0} />

        <div className="flex flex-col flex-grow gap-5">
          <div className="flex-grow flex flex-col justify-between lg:max-h-1/2 bg-white rounded-2xl p-5">
            <div className="">
              <h1 className="text-2xl font-bold mb-2">Profile</h1>
              <div className="flex flex-col gap-1 text-lg">
                <p>Email : {user.email}</p>
                {user.student && (
                  <>
                    <p>Class : {user.student.class}</p>
                    <p>Major : {user.student.major}</p>
                  </>
                )}
              </div>
            </div>
            {!user.student && (
              <Link
                href={"/complete_profile"}
                className="w-fit px-5 py-1 bg-primary rounded font-semibold"
              >
                Complete Profile
              </Link>
            )}
          </div>
          <div className="flex flex-col justify-between lg:max-h-1/2 bg-white rounded-2xl p-5 gap-5">
            <Link
              href={"/dashboardTest/student/borrow/request"}
              className="bg-primary rounded-xl flex-grow p-2 px-5"
            >
              <div className="text-2xl font-bold flex gap-3 justify-center items-center">
                <h1>Borrow Request</h1>
                <p>{borrowRequestCount}</p>
              </div>
            </Link>
            <Link
              href={"/dashboardTest/student/borrow/current"}
              className="bg-blue-300 rounded-xl flex-grow p-2 px-5"
            >
              <div className="text-2xl font-bold flex gap-3 justify-center items-center">
                <h1>Borrow</h1>
                <p>{borrowCount}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
