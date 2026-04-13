// components
import Content from "./content";

// template
import { UserData } from "@hwasanchae/app/template/other/username"; // ✅ 
import { SocialMedia } from "@hwasanchae/app/template/hwasanchae/socialmedia"; // ✅ 
import { Preview } from "@hwasanchae/app/template/hwasanchae/profile"; // ✅ 

// metadata
import { Metadata } from "next";

type PageProps = {
    params: Promise<{
        userId: string;
    }>
}

async function getUserData(idUser: string) {
    try {
        const baseUrl = process.env.BASE_URL!;
        const response = await fetch(`${baseUrl}/api/auth/user?userId=${idUser}`, {
            next: { tags: [`profile`, `profile:${idUser}`] }
        });
        const responseData = await response.json();
        const data = responseData.data as UserData;

        return data;
    } catch (error) {
        console.log(`Error get user data: ${error}`);

        return null;
    }
}

export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const { userId } = await params;
    const userData = await getUserData(userId);

    if (userData) {
        let allKeywords = [`${userData.username}`, `${userData.profile}`];

        return {
            title: `Profile ${userData.username}`,
            description: `Profile Page for ${userData.username}`,
            keywords: [...allKeywords],
            openGraph: {
                title: `Profile ${userData.username}`,
                description: `Profile Page for ${userData.username}`,
                images: [`${userData.profile?.url}`]
            }
        }
    }

    return {
        title: null
    }
}

export default async function Page({ params }: PageProps) {
    const { userId } = await params;

    function getColorFromString(str: string) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        const r = (hash >> 0) & 255;
        const g = (hash >> 8) & 255;
        const b = (hash >> 16) & 255;

        // biar tetap soft
        const soft = (val: number) => Math.floor((val + 255) / 2);

        return `rgb(${soft(r)}, ${soft(g)}, ${soft(b)})`;
    }
    
    let name: string = "";
    let profile: Preview | null = null;
    let aboutMe: string | null = null;
    let socialMedia: SocialMedia[] = [];
    let color: string = '#000000';

    const data = await getUserData(userId);
    if (data) {
        name = data.username;
        profile = data.profile;
        aboutMe = data.about;
        socialMedia = data.media;
        color = getColorFromString(data.username);
    }

    return <Content 
        name={name}
        profile={profile}
        aboutme={aboutMe}
        socialMedia={socialMedia}
        color={color}
    />
}