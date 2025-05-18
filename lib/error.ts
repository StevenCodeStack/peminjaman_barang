export class UserFriendlyError extends Error {
  constructor(public userMessage: string) {
    super(userMessage);
  }
}

export class UserNotSignedIn extends UserFriendlyError {
  constructor() {
    super("Login First!");
  }
}

export class UnAuthorized extends UserFriendlyError {
  constructor() {
    super("You do not have an access!");
  }
}

export class BorrowLimitError extends UserFriendlyError {
  constructor() {
    super(
      "You have reached your borrowing limit. Please return some items first."
    );
  }
}

export class ItemUnavailableError extends UserFriendlyError {
  constructor() {
    super("This item is currently unavailable. Please try again later.");
  }
}

export class NotFound extends UserFriendlyError {
  constructor() {
    super("Not Found! Please try again");
  }
}
