"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import React from "react";

const studentLinks = [
  {
    title: "Borrow",
    path: "borrow",
    links: [
      {
        id: "request",
        name: "Request",
      },
      {
        id: "current",
        name: "Current Items",
      },
      {
        id: "history",
        name: "History",
      },
    ],
  },
  {
    title: "Profile",
    path: "profile",
    links: [
      {
        id: "profile_details",
        name: "Profile Details",
      },
    ],
  },
];

const adminLinks = [
  {
    title: "Users",
    path: "users",
    links: [
      {
        id: "students",
        name: "Students",
      },
      {
        id: "admins",
        name: "Admins",
      },
    ],
  },
  {
    title: "History",
    path: "history",
    links: [
      {
        id: "borrow_request",
        name: "Borrow Request",
      },
      {
        id: "borrow",
        name: "Borrow",
      },
    ],
  },
  {
    title: "Items",
    path: "item",
    links: [
      {
        id: "all_items",
        name: "All Items",
      },
      {
        id: "borrowed_items",
        name: "Borrowed Items",
      },
    ],
  },
];

const Links = () => {
  const { user } = useUser();
  const role = user?.publicMetadata.role;
  const links =
    role === "student"
      ? studentLinks
      : role === "admin" || role === "superAdmin"
      ? adminLinks
      : [];
  const segment = useSelectedLayoutSegments();
  const currentSegment = segment[2] || null;
  return (
    <div className="mt-10 flex flex-col gap-5">
      {links.map((element) => (
        <div key={`section-${element.title}`}>
          <h1 className="text-lg font-semibold">{element.title}</h1>
          <div className="flex flex-col gap-2 mt-3">
            {element?.links.map((link) => (
              <Link
                key={link.id}
                href={`/dashboardTest/${role}/${element.path}/${link.id}`}
                className={currentSegment === link.id ? "active" : "inActive"}
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

export default Links;
