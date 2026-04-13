import { Preview } from "../hwasanchae/profile"; // ✅

// ✅ template/story/chapter.ts
// ✅ template/serverHelper.ts
// ✅ [story]/[idStory]/[chapter]/[idChapter]/page.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/content.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/commentContent/content.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/commentContent/components/commentContent.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/commentContent/components/commentItem.tsx
// ✅ lib/firebase/service.ts
export type CommentData = {
    id: string;
    username: string;
    userId?: string | null;
    profile?: Preview | null;
    comment: string;
    replies?: CommentData[] | null;
}