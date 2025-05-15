import {
  Admin,
  Borrow,
  BorrowRequest,
  BorrowReturn,
  Item,
  Student,
  User,
} from "@prisma/client";

export type UserStudent = User & { student: Student };

export type UserAdmin = User & { admin: Admin };

export type BorrowWithItem = Borrow & { item: Item; student?: Student };

export type BorrowRequestWithItem = BorrowRequest & {
  item: Item;
  student?: Student;
};

export type BorrowReturnWithBorrow = BorrowReturn & {
  borrow: BorrowWithItem;
  student?: UserStudent;
};
