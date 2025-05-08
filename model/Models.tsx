export enum UserRole {
  STUDENT = "student",
  ADMIN = "admin",
}

enum AdminType {
  SUPERADMIN,
  ADMIN,
}

type Student = {
  nik: string;
  warning: number;
  class: string;
};

type Admin = {
  type: AdminType;
};

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  picture: string;
  role: UserRole;

  // Role
  student: Student | null;
  admin: Admin | null;

  created_at: Date;
  updated_at: Date;
};

export type Item = {
  // id string
  id: number;
  name: string;
  type: string;
  category: string;
  isAvailable: boolean;
  picture: string;
};

export type Borrow = {
  // id string
  id: number;
  student: User;
  item: Item;
  status: "Pending" | "Verified" | "Rejected" | "Overdue" | "Success";
  borrorCode: string | null;
  borrowDate: Date | null;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
