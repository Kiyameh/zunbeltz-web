import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isProtectedRoute = createRouteMatcher(["/protected(.*)"]);

export const onRequest = clerkMiddleware((auth, context) => {
  const { isAuthenticated, redirectToSignIn, userId } = auth();

  if (!isAuthenticated && isProtectedRoute(context.request)) {
    console.log("Redirecting to signin");

    return redirectToSignIn();
  }
});
