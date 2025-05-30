import GridItems from "@/components/Dashboard/admin/items/GridItems";
import prisma from "@/config/PrismaClient";
import { ItemWithBorrowAndUser } from "@/types/types";
import React from "react";

const page = async () => {
  const data = (await prisma.item.findMany({
    select: {
      isDamaged: true,
      name: true,
      category: true,
      type: true,
      isAvailable: true,
      picture: true,
      id: true,
      borrowRequest: {
        take: 1,
        where: { status: "PENDING" },
        select: {
          createdAt: true,
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
      borrow: {
        where: {
          active: true,
        },
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          createdAt: true,
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
    orderBy: { createdAt: "desc" },
  })) as ItemWithBorrowAndUser[];
  return (
    <div>
      <h1 className="text-center font-bold py-5 text-2xl">All Items</h1>
      {data.length >= 0 ? (
        <GridItems data={data} />
      ) : (
        <h1 className="text-center">No Data... </h1>
      )}
    </div>
  );
};

export default page;
