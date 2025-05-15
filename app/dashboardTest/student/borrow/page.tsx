import { redirect } from "next/navigation";

const page = () => {
  return redirect("/dashboard/student/borrow/current");
};

export default page;
