// ✅ template/story/chapter.ts
// ✅ [story]/[idStory]/[chapter]/[idChapter]/footnote/components/content.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/footnote/components/footnoteContainer.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/@modal/(.)footnote/components/content.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/@modal/(.)footnote/components/footnoteContainer.tsx
// ✅ glosarium/components/groupPhrase.tsx
// ✅ glosarium/[id]/page.tsx
// ✅ admin/mycontents/story/[idStory]/[idChapter]/components/content.tsx
// ✅ admin/mycontents/story/[idStory]/[idChapter]/components/bottomContent/content.tsx
// ✅ admin/mycontents/story/[idStory]/[idChapter]/components/bottomContent/components/footnoteContainer.tsx
export type FootnoteInput = {
    phrase: string;
    meaning: string;
}

// ✅ glosarium/components/content.tsx
// ✅ glosarium/[id]/page.tsx
export type GlosariumList = {
    alphaNum: string;
    footnote: FootnoteInput[];
}