// technical
import { Content } from "@tiptap/core";

import { FootnoteInput } from "./footnote"; // ✅ 
import { CommentData } from "./comment"; // ✅ 

// ✅ template/uiHelper.tsx
export type DataChapterAPI = {
    title: string;
    content: Content | any | null | JSON;
    footnotes: FootnoteInput[];
    vote: number;
    read: number;
    status: string;
    commentId: string;
    comments: CommentData[];
    updatedAt: string;
    createdAt: string;
}

// ✅ template/story/story.ts
export type Chapter = {
    idChapter: string;
    sort: number;
}

// ✅ [story]/[idStory]/[chapter]/[idChapter]/page.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/content.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/topContent/content.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/topContent/components/detailDesc.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/footnote/[idFootnote]/page.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/@modal/(.)footnote/[idFootnote]/page.tsx
// ✅ admin/mycontents/story/[idStory]/[idChapter]/page.tsx
// ✅ admin/mycontents/story/[idStory]/[idChapter]/components/content.tsx
// ✅ lib/firebase/service.ts
// ✅ (this)
export type MyChapter = {
    id: string;
    title: string;
    content: string | Content | any | null;
    footnotes: FootnoteInput[];
    vote: number;
    read: number;
    status: string;
    commentId: string | null;
    updatedAt: string;
    createdAt: string;
}

// ✅ lib/firebase/service.ts
export type DataChapter = Omit<MyChapter, `id` | `updatedAt` | `createdAt`>

// ✅ admin/mycontents/story/components/content.tsx
// ✅ admin/mycontents/story/components/contentBottom/content.tsx
// ✅ admin/mycontents/story/components/contentBottom/components/dragableContainer.tsx
export type ChapterData = MyChapter & {
    sort: number;
}

// ✅ template/story/story.ts
// ✅ page.tsx
// ✅ [story]/[idStory]/page.tsx
// ✅ [story]/[idStory]/components/thirdContent/content.tsx
// ✅ [story]/[idStory]/components/thirdContent/leftContent/content.tsx
// ✅ [story]/[idStory]/components/thirdContent/leftContent/components/listContainer.tsx
// ✅ glosarium/[id]/page.tsx
export type NewChapterItem = MyChapter & {
    sort: number;
    comments: CommentData[];
}

// ✅ [story]/[idStory]/components/thirdContent/content.tsx
export type ChapterNameLink = {
    title: string;
    id: string;
}

// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/content.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/bottomContent/content.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/bottomContent/rightContent/content.tsx
export type ChapterNextPrev = {
    idChapter: string;
    titleChapter: string;
}