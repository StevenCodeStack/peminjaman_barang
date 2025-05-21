"use client";
import React from "react";
import { studentLinks } from "@/constants/DashboardNavigation";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

const AdminLinks = () => {
  const segments = useSelectedLayoutSegments();
  return (
    <div className="mt-5">
      {studentLinks.map((element) => (
        <div key={element.title} className="mb-5">
          <h1 className="font-semibold text-lg mb-2">{element.title}</h1>
          <div className="flex flex-col">
            {element.links.map((link) => (
              <Link
                className={`${
                  segments[1] === element.path &&
                  segments[2] === link.id &&
                  "bg-primary font-semibold"
                } px-5 py-1 rounded`}
                key={link.id}
                href={`/dashboardTest/student/${element.path}/${link.id}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminLinks;
