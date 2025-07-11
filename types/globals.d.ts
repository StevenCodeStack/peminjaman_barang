export {};

// Create a type for the roles
export type Roles = "admin" | "student" | "superAdmin";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
