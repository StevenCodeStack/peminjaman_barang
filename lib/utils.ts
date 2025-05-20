import { UserAdmin, UserStudent } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isNullOrEmpty(str: string | null | undefined) {
  return !str || str.trim() === "";
}

export function dateFormat(date: Date | null) {
  return date?.toLocaleDateString() || "No Date";
}

export function isAdmin(user: UserAdmin | UserStudent) {
  return (user as UserAdmin).admin !== undefined;
}
export function isStudent(user: UserAdmin | UserStudent) {
  return (user as UserStudent).student !== undefined;
}
