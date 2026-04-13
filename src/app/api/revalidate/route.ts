// next server
import { NextRequest, NextResponse } from "next/server";

// encrypt
import crypto from "crypto";

// next cache
import { revalidateTag } from "next/cache";

// redis
import { redis } from "@hwasanchae/lib/redis/redis";

// tags
const allowedTag = ["story", "chapter", "profile", "hwasanchae"];
const dynamicPreficsTag = ["story:", "chapter:", "profile:"]

export async function POST(req: NextRequest) {
    const tag = req.nextUrl.searchParams.get("tag");
    if (!tag) {
        return NextResponse.json(
            {
                status: `Failed`,
                message: `No tag included!`
            },
            {
                status: 400
            }
        )
    }

    const isValidTag = 
        allowedTag.includes(tag) || 
        dynamicPreficsTag.some(prefix => prefix.includes(tag))

    if (!isValidTag) {
        return NextResponse.json(
            {
                status: `Failed`,
                message: `Tag not allowed!`
            },
            {
                status: 400
            }
        )
    }

    const signature = req.headers.get("x-signature");
    const timestamp = req.headers.get("x-timestamp");
    const nonce = req.headers.get("x-nonce");

    if (!signature || !timestamp || !nonce) {
        return NextResponse.json(
            {
                status: `Failed`,
                message: `Unauthorized`
            },
            {
                status: 401
            }
        )
    }

    const now = Date.now();
    if (Math.abs(now - Number(timestamp)) > 30_000) {
        return NextResponse.json(
            {
                status: `Failed`,
                message: `Expired`
            },
            {
                status: 401
            }
        )
    }

    const isUsedNonce = await redis.get(`nonce:${nonce}`);
    if (isUsedNonce) {
        return NextResponse.json(
            {
                status: `Failed`,
                message: `Replay detected`
            },
            {
                status: 401
            }
        )
    }

    const expected = crypto
        .createHmac("sha256", process.env.SECRET_REVALIDATE!)
        .update(`${timestamp}.${nonce}`)
        .digest(`hex`);

    if (
        signature.length !== expected.length ||
        !crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expected)
        )
    ) {
        return NextResponse.json(
            {
                status: `Failed`,
                message: `Invalid signature`
            },
            {
                status: 401
            }
        )
    }

    await redis.set(`nonce:${nonce}`, "used", { ex: 30 });

    revalidateTag(tag, "max");

    return NextResponse.json(
        {
            status: `Success`,
            message: `Successfully revalidate data`,
            data: {
                revalidated: true,
                timestamp: timestamp
            }
        }
    )
}