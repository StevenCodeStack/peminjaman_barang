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
        id: "borrowed_history",
        name: "Borrowed History",
      },
      {
        id: "returned_history",
        name: "Returned History",
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

const role = "student";

const Links = () => {
  const links =
    role === "student"
      ? studentLinks
      : role === "admin" || role === "superAdmin"
      ? adminLinks
      : [];
  const segment = useSelectedLayoutSegments();
  const currentSegment = segment[2] || null;
  console.log(currentSegment);
  return (
    <div className="mt-10">
      {links.map((element) => (
        <div key={element.title} className="mt-5">
          <h1 className="text-lg font-semibold">{element.title}</h1>
          <div className="flex flex-col gap-1 mt-3">
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
