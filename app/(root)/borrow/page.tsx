import prisma from "@/config/PrismaClient";
import GridItem from "./components/GridItem";
import SearchBar from "./components/SearchBar";
import React from "react";
import { Item } from "@prisma/client";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) => {
  const params = await searchParams;
  const search = params.search || "";

  const items: Item[] = await prisma.item.findMany({
    where: {
      isAvailable: true,
      OR: [
        { name: { contains: search } },
        { type: { contains: search } },
        { category: { contains: search } },
      ],
    },
  });
  return (
    <div className="pt-10 px-10 lg:px-20 xl:px-30">
      <SearchBar />
      <GridItem items={items} />
    </div>
  );
};

export default page;
