import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtected = createRouteMatcher(["/dashboardTest(.*)"]);
const isStudentRoute = createRouteMatcher(["/dashboardTest/student(.*)"]);
const isAdminRoute = createRouteMatcher(["/dashboardTest/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect();
  const { sessionClaims } = await auth();

  if (isAdminRoute(req) && sessionClaims?.metadata.role !== "admin") {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  if (isStudentRoute(req) && sessionClaims?.metadata.role !== "student") {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

// if (isStudent(req) && !hasPermission(role, "dashboardStudent:view")) {
//   return NextResponse.redirect(new URL("/unauthorized", req.url));
// }

// if (isAdmin(req) && !hasPermission(role, "dashboardAdmin:view")) {
//   return NextResponse.redirect(new URL("/unauthorized", req.url));
// }
