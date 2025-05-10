import Link from "next/link";
import React from "react";
const studentLinks = [
  {
    title: "My History",
    links: [
      {
        id: "my_borrowed_items",
        name: "My Borrowed Items",
      },
      {
        id: "my_returned_items",
        name: "My Returned Items",
      },
    ],
  },
  {
    title: "Profile",
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

const Links = ({ section }: { section: string }) => {
  const links =
    role === "student"
      ? studentLinks
      : role === "admin" || role === "superAdmin"
      ? adminLinks
      : [];
  return (
    <div className="mt-10">
      {links.map((element) => (
        <div key={element.title} className="mt-5">
          <h1 className="text-lg font-semibold">{element.title}</h1>
          <div className="flex flex-col gap-1 mt-3">
            {element?.links.map((link) => (
              <Link
                key={link.id}
                href={`/dashboard/${link.id}`}
                className={section === link.id ? "active" : "inActive"}
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
