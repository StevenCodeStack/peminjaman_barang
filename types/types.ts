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

export type ItemWithBorrowAndUser = Item & {
  borrow: Array<Borrow & { user: UserStudent }>;
};

export type BorrowWithItem = Borrow & { item: Item; user: UserStudent };

export type BorrowRequestWithItem = BorrowRequest & {
  item: Item;
  user: UserStudent;
};

export type BorrowReturnWithBorrow = BorrowReturn & {
  borrow: BorrowWithItem;
  user: UserStudent;
};

export type ClerkWebhookEvent = {
  type: string;
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      id: string;
    }>;
    first_name?: string;
    last_name?: string;
    image_url: string;
    username?: string;
  };
};
