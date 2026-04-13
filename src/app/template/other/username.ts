import { Preview } from "../hwasanchae/profile"; // ✅
import { SocialMedia } from "../hwasanchae/socialmedia"; // ✅

// ✅ admin/dashboard/components/fourthContent/content.tsx
// ✅ admin/dashboard/incognito/content.tsx
// ✅ admin/dashboard/@modal/(.)incognito/content.tsx
// ✅ lib/firebase/service.ts
export type IncognitoProfile = {
    profile: Preview | null;
    username: string;
}

// ✅ (this)
export type UserRole = "admin" | "developer" | "reader";

// ✅ (this)
export type LogTypeUser = ("credentials" | "google")[];

// ✅ PublicLayoutClient.tsx
// ✅ [story]/[idStory]/page.tsx
// ✅ dev/profile/content.tsx
// ✅ profile/[userId]/page.tsx
// ✅ lib/firebase/service.ts
export type UserData = {
    id: string;
    profile: Preview | null;
    username: string;
    role: UserRole;
    email: string;
    about: string | null;
    password: string | null;
    media: SocialMedia[];
    logType: LogTypeUser;
    createdAt: string;
}

// ✅ lib/firebase/service.ts
export const initUserMedia: SocialMedia[] = [
    {
        name: `Instagram`,
        link: null,
        logo: {
            publicId: `instagram_logo_jq5ngg`,
            url: `https://res.cloudinary.com/da2wmwiql/image/upload/v1774935635/instagram_logo_jq5ngg.png`
        }
    },
    {
        name: `Discord`,
        link: null,
        logo: {
            publicId: `discord_logo_idnidd`,
            url: `https://res.cloudinary.com/da2wmwiql/image/upload/v1774935634/discord_logo_idnidd.png`
        }
    },
    {
        name: `WhatsApp`,
        link: null,
        logo: {
            publicId: `whatsapp_logo_ivpjfk`,
            url: `https://res.cloudinary.com/da2wmwiql/image/upload/v1774935638/whatsapp_logo_ivpjfk.png`
        }
    },
    {
        name: `YouTube`,
        link: null,
        logo: {
            publicId: `youtube_logo_i6ettm`,
            url: `https://res.cloudinary.com/da2wmwiql/image/upload/v1774935638/youtube_logo_i6ettm.png`
        }
    },
    {
        name: `Facebook`,
        link: null,
        logo: {
            publicId: `facebook_logo_eokfr3`,
            url: `https://res.cloudinary.com/da2wmwiql/image/upload/v1774935746/facebook_logo_eokfr3.png`
        }
    },
    {
        name: `LinkedIn`,
        link: null,
        logo: {
            publicId: `linkedin_logo_buszyz`,
            url: `https://res.cloudinary.com/da2wmwiql/image/upload/v1774935635/linkedin_logo_buszyz.png`
        }
    },
    {
        name: `Portfolio`,
        link: null,
        logo: {
            publicId: `portfolio_logo_wfev5p`,
            url: `https://res.cloudinary.com/da2wmwiql/image/upload/v1774935636/portfolio_logo_wfev5p.png`
        }
    }
];
