// next server
import { NextRequest, NextResponse } from "next/server";

// next auth
import { getServerSession } from "next-auth";

// auth options
import { authOptions } from "../auth/[...nextauth]/route";

// service
import { addComment, getCommentData, getUserData } from "@hwasanchae/lib/firebase/service";

// template
import { Preview } from "@hwasanchae/app/template/hwasanchae/profile"; // ✅ 

// GET COMMENT DATA
export async function GET(
    request: NextRequest
) {
    const { searchParams } = new URL(request.url);
    const idComment = searchParams.get("idComment");

    if(!idComment) return NextResponse.json({
        status: `Failed`,
        message: `Failed to fetch data comment, No ID comment included!`
    });

    const resultData = await getCommentData(idComment);

    return NextResponse.json({
        status: resultData.status,
        message: resultData.message,
        data: resultData?.data
    });
}

// ADD COMMENT DATA
export async function PUT(
    request: NextRequest
) {
    const { searchParams } = new URL(request.url);
    const idComment = searchParams.get("idComment");
    const idEdge = searchParams.get("idEdge");
    const reqData = await request.json();

    let username: string | null = null;
    let userId: string | null = null;
    let profile: Preview | null = null;

    if (!reqData.incognito) {
        const session = await getServerSession(authOptions);
        userId = session?.user.id ?? null;

        if (userId) {
            const profileData = await getUserData(userId);

            username = profileData.data?.username ?? null;
            profile = profileData.data?.profile ?? null;
        }
    } 

    const comment = reqData.comment;

    console.log({ comment, idComment, idEdge, username, userId, profile });

    const resultData = await addComment(comment, idComment, idEdge, username, userId, profile);
    
    return NextResponse.json({
        status: resultData.status,
        message: resultData.message
    });
}