import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { USER_ROLE_ADMIN } from "./helpers/coreConstant";

export default function middleware(req: NextRequest) {
  let verify = req.cookies.get("token");
  let role = req.cookies.get("role");
  const pathsToCheck = [
    "/pages",
    "/users",
    "/templates",
    "/ai-code",
    "/ai-translation",
    "/ai-writer",
    "/code-document",
    "/document",
    "/my-uses",
    "/profile",
    "/templates",
    "/transaction-history",
    "/translate-document",
    "/dashboard",
    "/favourites",
    "/upgrade",
    "/my-favourites",
    "/admin",
    "/admin/payments/packages/subscription",
    "/admin/payments/packages/aditional-packs",
  ];
  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    Number(role?.value) !== USER_ROLE_ADMIN
  ) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard`
    );
  }
  if (
    !verify?.value &&
    pathsToCheck.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URL}/login`);
  }
}
