// next server
import { NextRequest, NextResponse } from "next/server";

// middleware 
import { withRole } from "@hwasanchae/lib/middleware/auth";

// service
import { addNewStory, deleteStory, getStory, updateStory } from "@hwasanchae/lib/firebase/service";

// next auth
import { getServerSession } from "next-auth";

// revalidate
import { revalidateAction } from "@hwasanchae/lib/firebase/revalidateAction";

// auth options 
import { authOptions } from "../auth/[...nextauth]/route";

// GET STORY OR ALL STORY
export async function GET(
    request: NextRequest
) {
    const { searchParams } = new URL(request.url);
    const idStory = searchParams.get("idStory");

    const resultData = await getStory(idStory);

    return NextResponse.json({
        status: resultData?.status,
        message: resultData?.message,
        data: resultData?.data
    });
}

// ADD NEW STORY
export const POST = withRole(async (request: NextRequest) => {
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

    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    console.log({ userId });

    reqData = {
        ...reqData,
        translator: {
            name: reqData.translator?.name,
            userId: userId ?? ""
        }
    }

    const resultData = await addNewStory(reqData);
    if (resultData.status === 'Success') {
        await revalidateAction([`story`]);

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

// UPDATE STORY
export const PUT = withRole(async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const idStory = searchParams.get("idStory");

    let reqData;
    try {
        reqData = await request.json();
    } catch (error) {
        return NextResponse.json(
            {
                status: `Failed`,
                message: `Failed to add new data error: No Data included`
            },
            {
                status: 400
            }
        )
    }

    if (!reqData || !idStory) {
        return NextResponse.json(
            {
                status: `Failed`,
                message: `Failed to add new data error: No ID Story or Data included`
            },
            {
                status: 400
            }
        )
    }

    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    console.log({ session });
    console.log({ userId });

    reqData.data = {
        ...reqData.data,
        translator: {
            name: reqData.data.translator?.name,
            userId: userId ?? ""
        }
    }

    const resultData = await updateStory(idStory, reqData.data, reqData.prevIdIll);
    if (resultData.status === 'Success') {
        await revalidateAction([`story`, `story:${idStory}`]);

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

// DELETE STORY
export const DELETE = withRole(async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const idStory = searchParams.get('idStory');

    if (!idStory) return NextResponse.json(
        {
            status: `Failed`,
            message: `Error: No ID story included`
        },
        {
            status: 400
        }
    );

    const resultData = await deleteStory(idStory);
    if (resultData.status === 'Success') {
        await revalidateAction([`story`]);

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