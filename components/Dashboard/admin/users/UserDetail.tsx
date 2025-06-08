import { dateFormat, isAdmin, isStudent } from "@/lib/utils";
import { UserAdmin, UserStudent } from "@/types/types";
import Image from "next/image";
import React from "react";
import { IoMdClose } from "react-icons/io";

const UserDetail = ({
  user,
  close,
}: {
  user: UserAdmin | UserStudent | null;
  close: () => void;
}) => {
  if (user == null) return null;

  return (
    <div className="p-5 rounded bg-slate-900 relative w-100 md:w-130 h-120 md:h-140 flex flex-col">
      <IoMdClose
        onClick={close}
        className="absolute top-5 right-5 text-red-500 text-3xl"
      />
      <div className="h-full w-fit self-center mb-5 aspect-square max-h-1/2 relative">
        <Image
          src={user.picture}
          fill
          alt=""
          className="rounded-full object-cover"
        />
      </div>
      <table className="text-white mx-5">
        <tbody className="">
          <tr>
            <td>Username</td>
            <td className="px-1">:</td>
            <td>{user.username || "No Username"}</td>
          </tr>
          <tr>
            <td>Full Name</td>
            <td className="px-1">:</td>
            <td>{user.fullName || "No Full Name"}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td className="px-1">:</td>
            <td>{user.email}</td>
          </tr>
          {isAdmin(user) && (
            <tr>
              <td>Admin Type</td>
              <td className="px-1">:</td>
              <td>{(user as UserAdmin).admin.type}</td>
            </tr>
          )}
          {isStudent(user) && (
            <>
              <tr>
                <td>NIS</td>
                <td className="px-1">:</td>
                <td>{(user as UserStudent).student.nik}</td>
              </tr>
              <tr>
                <td>Class</td>
                <td className="px-1">:</td>
                <td>{(user as UserStudent).student.class}</td>
              </tr>
              <tr>
                <td>Major</td>
                <td className="px-1">:</td>
                <td>{(user as UserStudent).student.major}</td>
              </tr>
              <tr>
                <td>Warning</td>
                <td className="px-1">:</td>
                <td>{(user as UserStudent).student.warning}</td>
              </tr>
            </>
          )}

          <tr>
            <td>Joined At</td>
            <td className="px-1">:</td>
            <td>{dateFormat(user.createdAt)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDetail;
