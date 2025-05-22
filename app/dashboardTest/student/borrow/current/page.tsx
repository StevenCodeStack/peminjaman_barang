import GridItems from "@/components/Dashboard/student/Borrow/Current/GridItems";
import prisma from "@/config/PrismaClient";
import { BorrowWithItem } from "@/types/types";
import { auth } from "@clerk/nextjs/server";

const page = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const data = (await prisma.borrow.findMany({
    where: {
      active: true,
      user: {
        id: userId,
        student: { isNot: null },
      },
    },
    include: {
      item: true,
      user: {
        include: {
          student: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })) as BorrowWithItem[];

  return (
    <div className="w-full">
      <h1 className="text-center font-bold text-3xl">My Borrowed Items</h1>
      {data.length <= 0 ? (
        <h1 className="text-center">No Data...</h1>
      ) : (
        <GridItems data={data} />
      )}
    </div>
  );
};

export default page;
