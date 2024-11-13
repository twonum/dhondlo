import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/mybookings(.*)", "/book/(.*)"]);

const isAdminRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, req: NextRequest) => {
  const { userId, redirectToSignIn, sessionClaims } = auth();

  // Redirect to sign-in if the user is not logged in and is trying to access protected or admin routes
  if (!userId && (isProtectedRoute(req) || isAdminRoute(req))) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Handle admin authorization for authenticated users
  if (userId && isAdminRoute(req)) {
    // Check if sessionClaims and metadata are defined before accessing role
    const userRole = sessionClaims?.metadata?.role;

    if (userRole === "admin") {
      return NextResponse.next();
    } else {
      return new Response(`You are not authorized`, { status: 401 });
    }
  }

  return NextResponse.next();
});
