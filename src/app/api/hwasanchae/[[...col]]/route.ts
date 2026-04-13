// next server
import { NextRequest, NextResponse } from "next/server";

// middleware
import { withRole } from "@hwasanchae/lib/middleware/auth";

// service
import { getHwasanchaeData, updateHwasanchaeData } from "@hwasanchae/lib/firebase/service";

// revalidate
import { revalidateAction } from "@hwasanchae/lib/firebase/revalidateAction";

type PageProps = {
    params : Promise<{
        col?: string[];
    }>
}

// GET DATA HWASANCHAE
export async function GET(
    request: NextRequest, 
    { params }: PageProps
) {
    const { col } = await params;
    const data = col?.[0] ?? null;

    const resultData = await getHwasanchaeData(data);

    return NextResponse.json({
        status: resultData?.status,
        message: resultData?.message,
        data: resultData?.data ?? null
    });
}

// UPDATE DATA HWASANCHAE
export const POST = withRole(async (request: NextRequest) => {
    let reqData;
    try {
        reqData = await request.json();
    } catch (error) {
        return NextResponse.json(
            {
                status: `Failed`,
                message: `Failed to update data. No data included`
            },
            {
                status: 400
            }
        );
    }

    const resultData = await updateHwasanchaeData(reqData.col, reqData.value, reqData.prevPubId);
    if (resultData.status === 'Success') {
        await revalidateAction([`hwasanchae`]);
            
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