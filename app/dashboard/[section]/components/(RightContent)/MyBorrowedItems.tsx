import React from "react";
import GridItems from "./components/GridItems";
import { Borrow, UserRole } from "@/model/Models";

const data: Borrow[] = [
  {
    id: 1,
    borrorCode: null,
    borrowDate: null,
    createdAt: new Date(),
    dueDate: null,
    status: "Pending",
    updatedAt: new Date(),
    item: {
      id: 1,
      name: "Laptop - 01",
      type: "Laptop Lenovo IdeaPad",
      category: "Laptop",
      isAvailable: true,
      picture:
        "https://plus.unsplash.com/premium_photo-1711051475117-f3a4d3ff6778?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww",
    },
    student: {
      admin: null,
      id: 1,
      created_at: new Date(),
      email: "@gmail.com",
      password: "asd",
      picture: "123",
      student: {
        class: "Xi RPL 1",
        warning: 0,
        nik: "123",
      },
      updated_at: new Date(),
      username: "steve",
      role: UserRole.STUDENT,
    },
  },
  {
    id: 2,
    borrorCode: null,
    borrowDate: null,
    createdAt: new Date(),
    dueDate: null,
    status: "Pending",
    updatedAt: new Date(),
    item: {
      id: 1,
      name: "Speaker - 01",
      type: "Speaker Ultra Mega Park Cool Massive",
      category: "Speaker",
      isAvailable: true,
      picture:
        "https://images.unsplash.com/photo-1531104985437-603d6490e6d4?q=80&w=2039&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    student: {
      admin: null,
      id: 1,
      created_at: new Date(),
      email: "@gmail.com",
      password: "asd",
      picture: "123",
      student: {
        class: "Xi RPL 1",
        warning: 0,
        nik: "123",
      },
      updated_at: new Date(),
      username: "steve",
      role: UserRole.STUDENT,
    },
  },
];

const MyBorrowedItems = () => {
  return (
    <div className="pt-10 px-10 sm:px-25 md:px-10 lg:px-5">
      <h1 className="text-2xl font-bold">My Borrowed Items</h1>
      <GridItems data={data} />
    </div>
  );
};

export default MyBorrowedItems;
