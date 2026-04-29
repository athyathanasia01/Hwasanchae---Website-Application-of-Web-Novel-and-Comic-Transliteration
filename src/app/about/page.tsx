// template
import { HwasanchaeData } from "../template/hwasanchae/hwasanchae";

// components
import Content from "./components/context";

// metadata
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getHwasanchaeData();

    if (data) {
        const description = data.about;
        return {
            title: `About`,
            description: `Hwasanchae — ${description}`,
            keywords: [data.copyrightName, data.about],
            openGraph: {
                title: `About Hwasanchae`,
                description: `Hwasanchae — ${description}`,
                images: [data.profile]
            }
        }
    }

    return {
        title: `About`
    }
}

async function getHwasanchaeData() {
    try {
        const baseUrl = process.env.BASE_URL!;
        const response = await fetch(`${baseUrl}/api/hwasanchae`, {
            next: { tags: [`hwasanchae`] }
        });
        const responseData = await response.json();
        const data = responseData.data as HwasanchaeData;

        return data;
    } catch (error) {
        console.log(`Error get Hwasanchae data: ${error}`);

        return null;
    }
}

export default async function Page() {
    const data = await getHwasanchaeData();

    return (
        data ? <Content data={data} /> : <div>No Data Show</div>
    )
}