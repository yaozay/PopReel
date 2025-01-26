import  {clerkMiddleware}  from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"], // Matches all routes except API and static assets
};
