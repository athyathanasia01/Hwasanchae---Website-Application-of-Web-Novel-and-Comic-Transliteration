// auth options
import { authOptions } from "@hwasanchae/app/api/auth/[...nextauth]/route";

// next auth
import { getServerSession } from "next-auth";

// next server
import { NextRequest, NextResponse } from "next/server"

type Handler = (
    req: NextRequest,
    ctx: any,
    session: any
) => Promise<Response>;

export function withRole(handler: Handler, role: string[] = ["admin", "reader", "developer"]) {
    return async (req: NextRequest, ctx: any) => {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                {
                    status: `Failed`,
                    message: `Unauthorized`
                },
                {
                    status: 401
                }
            );
        }

        if (!session.user?.role || !role.includes(session.user.role)) {
            return NextResponse.json(
                {
                    status: `Failed`,
                    message: `Forbidden`
                },
                {
                    status: 403
                }
            );
        }

        return handler(req, ctx, session);
    }
}