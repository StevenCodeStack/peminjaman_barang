import prisma from "@/config/PrismaClient";
import GridItem from "./components/GridItem";
import SearchBar from "./components/SearchBar";
import React from "react";
import { Item } from "@prisma/client";

const page = async () => {
  const items: Item[] = await prisma.item.findMany({
    where: {
      isAvailable: true,
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
