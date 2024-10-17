import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const response = NextResponse.redirect(new URL("/", request.url))

    if (request.cookies.has("session")) {
        response.cookies.delete('session')
    }

    return response
}