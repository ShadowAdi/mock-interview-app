import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);

export default clerkMiddleware(async (auth, request) => {
    // Check if the current route is public
    if (!isPublicRoute(request)) {
        // Protect non-public routes
        await auth.protect();
    }
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
