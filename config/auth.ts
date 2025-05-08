type Role = keyof typeof ROLES;
type Permission = (typeof ROLES)[Role][number];

const ROLES = {
  student: ["borrow:create", "borrow:update"],
  admin: [
    "item:create",
    "item:update",
    "item:delete",
    "borrow:update",
    "borrow:delete",
    "user:view",
    "user:update",
  ],
  superAdmin: [
    "item:create",
    "item:update",
    "item:delete",
    "borrow:create",
    "borrow:update",
    "borrow:delete",
    "user:view",
    "user:update",
    "user:delete",
  ],
} as const;

export function hasPermission(role: Role, permission: Permission) {
  return (ROLES[role] as readonly Permission[]).includes(permission);
}
