// next server
import { NextRequest, NextResponse } from "next/server";

// next auth
import { getServerSession } from "next-auth";

// auth options
import { authOptions } from "../auth/[...nextauth]/route";

// middleware
import { withRole } from "@hwasanchae/lib/middleware/auth";

// service
import { addNewChapter, deleteChapter, getChapter, renewDataReadLike, updateChapter } from "@hwasanchae/lib/firebase/service";

// revalidate
import { revalidateAction } from "@hwasanchae/lib/firebase/revalidateAction";

// GET DATA CHAPTER OR ALL CHAPTER IN STORY
export async function GET(
    request: NextRequest,
) {
    const { searchParams } = new URL(request.url);
    const idStory = searchParams.get("idStory");
    const idChapter = searchParams.get("idChapter");

    const resultData = await getChapter(idStory, idChapter);

    return NextResponse.json({
        status: resultData?.status,
        message: resultData?.message,
        data: resultData?.data
    });
}

// ADD NEW CHAPTER
export const POST = withRole(async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const idStory = searchParams.get("idStory");

    let reqData;
    try {
        reqData = await request.json();
    } catch (error) {
        return NextResponse.json(
            {
                status: `Failed`,
                message: `Invalid JSON body`
            },
            {
                status: 400
            }
        );
    }

    if (!idStory || !reqData) {
        return NextResponse.json(
            {
                status: `Failed`,
                message: `Missing required data`
            },
            {
                status: 400
            }
        );
    }

    const resultData = await addNewChapter(idStory, reqData);
    if (resultData.status === 'Success') {
        await revalidateAction([`story`, `story:${idStory}`, `chapter`]);
    
        return NextResponse.json({
            status: resultData.status,
            message: resultData.message
        });
    }

    return NextResponse.json({
        status: resultData.status,
        message: resultData.message
    });
}, ["admin"]);

// UPDATE DATA CHAPTER, RENEW DATA LIKE AND READ
export async function PUT(
    request: NextRequest,
) {
    const { searchParams } = new URL(request.url);
    const reqData = await request.json().catch(() => null);;
    const idChapter = searchParams.get("idChapter");
    const data = searchParams.get("data");
    const updown = searchParams.get("updown") as "up" | "down" | null | undefined;

    if (!idChapter) return NextResponse.json({ status: `Failed`, message: `Failed to add new data error: No ID Chapter included` });

    if (!data) {
        if (!reqData) return NextResponse.json({ status: `Failed`, message: `Failed to add new data error: No Data included` });

        const resultData = await updateChapter(idChapter, reqData);
        if (resultData.status === 'Success') {
            await revalidateAction([`chapter`, `chapter:${idChapter}`]);
    
            return NextResponse.json({
                status: resultData.status,
                message: resultData.message
            });
        }

        return NextResponse.json({
            status: resultData.status,
            message: resultData.message
        });
    } else {
        const session = await getServerSession(authOptions);
        const role = session?.user?.role;

        const resultData = await renewDataReadLike(idChapter, data, updown, role);
        if (resultData.status === 'Success') {
            await revalidateAction([`chapter`, `chapter:${idChapter}`]);
    
            return NextResponse.json({
                status: resultData.status,
                message: resultData.message
            });
        }

        return NextResponse.json({
            status: resultData.status,
            message: resultData.message
        });
    }
}

// DELETE CHAPTER
export const DELETE = withRole(async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const idChapter = searchParams.get("idChapter");
    const idStory = searchParams.get("idStory");

    if (!idChapter || !idStory) return NextResponse.json(
        {
            status: `Failed`,
            message: `Failed to delete chapter. No ID chapter or ID story included`
        },
        {
            status: 400
        }
    );

    const resultData = await deleteChapter(idChapter, idStory);
    if (resultData.status === 'Success') {
        await revalidateAction([`story`, `story:${idStory}`, `chapter`, `chapter:${idChapter}`]);
    
        return NextResponse.json({
            status: resultData.status,
            message: resultData.message
        });
    }

    return NextResponse.json({
        status: resultData.status,
        messae: resultData.message
    });
}, ["admin"]);