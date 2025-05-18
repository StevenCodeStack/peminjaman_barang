export type Role = keyof typeof ROLES;
export type Permission = (typeof ROLES)[Role][number];

const ROLES = {
  student: ["borrow:create", "borrow:update", "dashboardStudent:view"],
  admin: [
    "item:create",
    "item:update",
    "item:delete",
    "borrow:update",
    "borrow:delete",
    "user:view",
    "user:update",
    "dashboardAdmin:view",
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
    "dashboardAdmin:view",
  ],
} as const;

export function hasPermission(role: Role | undefined, permission: Permission) {
  if (!role) return false;
  return (ROLES[role] as readonly Permission[]).includes(permission);
}
