import Form from "@/components/Dashboard/admin/items/Form";
import prisma from "@/config/PrismaClient";
import { Item } from "@prisma/client";
import React from "react";

const Page = async ({ params }: { params: Promise<{ itemId: string }> }) => {
  const data = (await prisma.item.findUnique({
    where: { id: (await params).itemId },
  })) as Item;

  return (
    <div className="px-10 sm:px-20 md:px-10 lg:px-5 xl:px-20">
      <h1 className="text-center font-bold text-2xl py-8">Edit Item</h1>
      <Form data={data} />
    </div>
  );
};

export default Page;
