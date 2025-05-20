import GridItems from "@/components/Dashboard/admin/items/GridItems";
import prisma from "@/config/PrismaClient";
import { ItemWithBorrowAndUser } from "@/types/types";
import React from "react";

const page = async () => {
  const data = (await prisma.item.findMany({
    select: {
      name: true,
      category: true,
      isAvailable: true,
      picture: true,
      borrow: {
        where: {
          active: true,
        },
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          user: {
            select: {
              fullName: true,
              student: {
                select: {
                  nik: true,
                },
              },
            },
          },
        },
      },
    },
  })) as ItemWithBorrowAndUser[];
  return (
    <div>
      <h1 className="text-center font-bold py-5 text-2xl">All Items</h1>
      {data.length < 0 ? (
        <GridItems data={data} />
      ) : (
        <h1 className="text-center">No Data... </h1>
      )}
    </div>
  );
};

export default page;
