import GridItems from "@/components/Dashboard/student/Borrow/Current/GridItems";
import prisma from "@/config/PrismaClient";
import { BorrowWithItem } from "@/types/types";

const page = async () => {
  const data: BorrowWithItem[] = await prisma.borrow.findMany({
    where: {
      active: true,
      studentId: "cmaow1i7h0000uly0t7cl8ofz",
    },
    include: {
      item: true,
    },
  });
  return (
    <div className="w-full">
      <h1 className="text-center font-bold text-3xl">My Borrowed Items</h1>
      <GridItems data={data} />
    </div>
  );
};

export default page;
