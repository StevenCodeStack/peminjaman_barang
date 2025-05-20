import { redirect } from "next/navigation";

const page = async () => {
  return redirect("/dashboardTest/admin/items/all_items");
};

export default page;
