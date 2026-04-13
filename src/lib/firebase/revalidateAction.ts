// encrypt
import crypto from "crypto";

// revalidate tag
export async function revalidateAction(tags: string[]) {
    try {
        const baseUrl = process.env.BASE_URL!;

        await Promise.all(
            tags.map(async (tag) => {
                const timestamp = Date.now().toString();
                const nonce = crypto.randomUUID();

                const signature = crypto
                    .createHmac("sha256", process.env.SECRET_REVALIDATE!)
                    .update(`${timestamp}.${nonce}`)
                    .digest("hex");

                const res = await fetch(`${baseUrl}/api/revalidate?tag=${tag}`, {
                    method: "POST",
                    headers: {
                        "x-signature": signature,
                        "x-timestamp": timestamp,
                        "x-nonce": nonce
                    }
                });

                if (!res.ok) {
                    console.error(`Failed: ${tag}`);
                }
            })
        );

        return true;
    } catch (error) {
        console.log(`Revalidate request failed: ${error}`);
        return false;
    }
}