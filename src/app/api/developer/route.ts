// service
import { getDeveloperContact, updateDeveloperContact } from "@hwasanchae/lib/firebase/service";

// middleware
import { withRole } from "@hwasanchae/lib/middleware/auth";

// next server
import { NextRequest, NextResponse } from "next/server";

export const PUT = withRole(async (request: NextRequest) => {
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
        )
    }

    if (!reqData) {
        return NextResponse.json(
            {
                status: `Failed`,
                message: `Invalid JSON body`
            },
            {
                status: 400
            }
        )
    }

    const updates: any = {};

    if (Array.isArray(reqData.contact)) {
        updates.contact = reqData.contact;
    }

    if (typeof reqData.copyrightName === "string") {
        updates.copyrightName = reqData.copyrightName;
    }

    if (Object.keys(updates).length === 0) {
        return NextResponse.json(
            {
                status: "Failed",
                message: "No valid field provided"
            },
            { status: 400 }
        );
    }

    const resultData = await updateDeveloperContact(updates);

    return NextResponse.json({
        status: resultData.status,
        message: resultData.message
    });
}, ["developer"]);

export async function GET(
    request: NextRequest
) {
    const resultData = await getDeveloperContact();

    return NextResponse.json({
        status: resultData.status,
        message: resultData.message,
        data: resultData.data
    });
}