import { Chapter, NewChapterItem } from "./chapter"; // ✅ 

// ✅ (this)
export type Translator = {
    name: string;
    userId: string;
}

// ✅ components/components/fourthContent/rightContent/content.tsx
// ✅ components/components/fourthContent/rightContent/components/cardContainer.tsx
// ✅ [story]/[idStory]/components/firstContent/rightContent/components/bottomContainer.tsx
// ✅ admin/mycontents/story/components/content.tsx
// ✅ admin/mycontents/story/components/contentTop/content.tsx
// ✅ admin/mycontents/story/components/contentTop/right/content.tsx
// ✅ admin/mycontents/story/components/contentTop/right/components/inputContainer.tsx
// ✅ (this)
export type Tag = {
    index: string;
    tag: string;
}

// ✅ page.tsx
// ✅ [story]/[idStory]/page.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/page.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/content.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/topContent/content.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/topContent/components/detailDesc.tsx
// ✅ bookmark/page.tsx
// ✅ glosarium/[id]/page.tsx
// ✅ admin/mycontents/components/content.tsx
// ✅ admin/mycontents/components/components/cardStoryContainer.tsx
// ✅ admin/mycontents/story/components/content.tsx
// ✅ admin/mycontents/story/[idStory]/page.tsx
// ✅ admin/mycontents/story/[idStory]/[idChapter]/page.tsx
// ✅ lib/firebase/service.ts
// ✅ (this)
export type MyStory = {
    id: string;
    title: string;
    coverImage: {
        url: string,
        publicId: string
    } | null;
    writer: string;
    translator: Translator;
    type: string;
    firstRelease: string;
    nativeLanguage: string;
    translatedLanguage: string;
    tags: Tag[],
    status: string;
    summary: string;
    chapters: Chapter[];
    createdAt: string; 
}

// ✅ components/components/thirdContent/content.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/content.tsx
export type LastReadStorage = {
    idStory: string;
    chapter: string[];
}

// ✅ components/components/thirdContent/content.tsx
export type LastReadData = {
    idStory: string;
    story: string; // title
    idChapter: string;
    chapter: string; // title
    image: string | undefined;
}

// ✅ bookmark/page.tsx
// ✅ bookmark/components/content.tsx
export type StoryUser = MyStory & {
    lastUpdate: string;
    lastTitle: string;
    vote: number;
    read: number;
    comments: number;
    isBookmark: boolean;
}

// ✅ components/components/content.tsx
// ✅ components/components/secondContent/content.tsx
// ✅ components/components/secondContent/components/topPopular.tsx
// ✅ components/components/secondContent/components/lastUpdateContent.tsx
// ✅ components/components/thirdContent/content.tsx
// ✅ components/components/fourthContent/content.tsx
// ✅ components/components/fourthContent/rightContent/content.tsx
// ✅ [story]/[idStory]/components/content.tsx
// ✅ [story]/[idStory]/components/firstContent/content.tsx
// ✅ [story]/[idStory]/components/firstContent/rightContent/content.tsx
// ✅ [story]/[idStory]/components/secondContent/content.tsx
// ✅ [story]/[idStory]/components/thirdContent/content.tsx
export type NewStoryDetail = Omit<MyStory, 'chapters'> & {
    chapters: NewChapterItem[],
    isBookmark: Boolean;
    lastUpdate: string;
    lastTitle: string;
    read: number;
    vote: number;
    comments: number;
}

// ✅ lib/firebase/service.ts
export type DataStorySend = Omit<MyStory, 'id'>

// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/content.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/bottomContent/content.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/bottomContent/rightContent/content.tsx
export type DetailStory = MyStory & {
    isBookmark: Boolean;
}