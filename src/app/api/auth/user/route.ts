// next server
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";

// next auth
import { getServerSession } from "next-auth";

// revalidate
import { revalidateAction } from "@hwasanchae/lib/firebase/revalidateAction";

// middleware
import { withRole } from "@hwasanchae/lib/middleware/auth";

// service
import { getUserData, updateUserData } from "@hwasanchae/lib/firebase/service";

// PROFILE
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const session = await getServerSession(authOptions);

    let userId = searchParams.get("userId");
    if (!userId) {
        if (!session) {
            return NextResponse.json({
                status: `Failed`,
                message: `No User ID found or detected!`
            });
        }

        userId = session?.user?.id!;
    }

    const resultData = await getUserData(userId);

    return NextResponse.json({
        status: resultData.status,
        message: resultData.message,
        data: resultData.data
    });
} 

// UPDATE DATA
export const PUT = withRole(async (req, ctx, session) => {
    const userId = session?.user?.id;
    let reqData;
    try {
        reqData = await req.json();
    } catch (error) {
        return NextResponse.json(
            {
                status: `Failed`,
                message: `Failed to update data. No data included`
            },
            {
                status: 400
            }
        )
    }

    const resultData = await updateUserData(userId, reqData.col, reqData.data, reqData.prevPubId);
    if (resultData.status === 'Success') {
        await revalidateAction([`profile:${userId}`]);
        
        return NextResponse.json({
            status: resultData.status,
            message: resultData.message
        });
    }

    return NextResponse.json({
        status: resultData.status,
        message: resultData.message
    });
});