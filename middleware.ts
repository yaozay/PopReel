import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((req) => {
  // You can add custom logic here if needed
  return NextResponse.next();
});

export const config = {
  // Match all requests (except static files) so Clerk can identify the user.
  matcher: ["/((?!.*\\..*|_next).*)"],
};
