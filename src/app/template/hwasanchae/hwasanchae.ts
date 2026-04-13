import { Donation } from "./donation"; // ✅
import { Preview } from "./profile"; // ✅
import { QuoteItem } from "./quote"; // ✅
import { SocialMedia } from "./socialmedia"; // ✅

// ✅ PublicLayoutClient.tsx
// ✅ layout.tsx
// ✅ page.tsx
// ✅ [story]/[idStory]/page.tsx
// ✅ [story]/[idStory]/components/secondContent/content.tsx
// ✅ [story]/[idStory]/components/content.tsx
// ✅ about/page.tsx
// ✅ about/components/content.tsx
// ✅ admin/dashboard/components/firstContent/content.tsx
export type HwasanchaeData = {
    about: string;
    donationList: Donation[];
    fyiList: string[];
    profile: Preview;
    quoteList: QuoteItem[];
    communityList: SocialMedia[];
    copyrightName: string;
}