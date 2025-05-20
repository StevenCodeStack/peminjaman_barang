import React from "react";
import { studentLinks } from "@/constants/DashboardNavigation";

const StudentLinks = () => {
  return (
    <div className="">
      {studentLinks.map((element) => (
        <div key={element.title} className="">
          <h1>{element.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default StudentLinks;
