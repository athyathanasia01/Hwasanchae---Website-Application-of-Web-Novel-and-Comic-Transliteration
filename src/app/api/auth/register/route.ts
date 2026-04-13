// next server
import { NextRequest, NextResponse } from "next/server";

// service
import { register } from "@hwasanchae/lib/firebase/service";

// REGISTER
export async function POST(request: NextRequest) {
    const req = await request.json();
    const result = await register(req);

    return NextResponse.json({
        status: result.status,
        message: result.message
    });
}