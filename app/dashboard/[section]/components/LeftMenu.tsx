import ClerkUserButton from "@/components/Navbar/ClerkUserButton";
import Link from "next/link";
import React from "react";

const studentLinks = [
  {
    title: "My History",
    link: [
      {
        id: "borrowed_items",
        name: "Borrowed Items",
      },
      {
        id: "returned_items",
        name: "Returned Items",
      },
    ],
  },
  {
    title: "Profile",
    link: [
      {
        id: "profile_details",
        name: "Profile Details",
      },
    ],
  },
];

const LeftMenu = async ({ section }: { section: string }) => {
  return (
    <div className="min-w-68 p-5 min-h-screen ">
      <div className="flex gap-2 justify-center items-center">
        <h1 className="font-rubik text-black text-3xl">
          SHARE<span className="text-primary">IT</span>
        </h1>
      </div>

      <div className="flex gap-3 mt-5">
        <ClerkUserButton />
        <p>Steven</p>
      </div>

      <div className="mt-10">
        {studentLinks.map((element) => (
          <div key={element.title} className="mt-5">
            <h1 className="text-lg font-semibold">{element.title}</h1>
            <div className="flex flex-col gap-1 mt-3">
              {element.link.map((link) => (
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
    </div>
  );
};

export default LeftMenu;
