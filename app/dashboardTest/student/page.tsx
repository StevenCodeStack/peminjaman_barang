import { redirect } from "next/navigation";

const page = () => {
  return redirect("/dashboardTest/student/borrow/current");
};

export default page;
