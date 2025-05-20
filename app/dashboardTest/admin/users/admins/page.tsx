import React from "react";
import prisma from "@/config/PrismaClient";
import GridItems from "@/components/Dashboard/admin/users/GridItems";
import { UserAdmin } from "@/types/types";

const page = async () => {
  const data = (await prisma.user.findMany({
    where: { role: "ADMIN", admin: { isNot: null } },
    include: { admin: true },
  })) as UserAdmin[];
  return (
    <div className="px-5 md:px-20 lg:px-5 xl:px-20 flex flex-col">
      <h1 className="text-center font-bold text-2xl py-8">All Admins</h1>
      {data.length > 0 ? (
        <GridItems data={data} />
      ) : (
        <h1 className="text-center">No Data...</h1>
      )}
    </div>
  );
};

export default page;
