import { CommentData } from "./story/comment"; // ✅

// ✅ admin/mycontents/story/components/content.tsx
// ✅ lib/firebase/service.ts
export function generateId(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length).toString();
}

// ✅ components/components/secondContent/components/topPopular.tsx
// ✅ components/components/secondContent/components/lastUpdateContainer.tsx
// ✅ components/components/fourthContent/rightContent/components/cardContainer.tsx
// ✅ [story]/[idStory]/components/firstContent/rightContent/components/topContent.tsx
// ✅ [story]/[idStory]/components/firstContent/rightContent/components/dataContainer.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/topContent/components/detailDesc.tsx
// ✅ admin/mycontents/components/components/cardStoryContainer.tsx
// ✅ admin/mycontents/story/components/contentBottom/components/dragableContent.tsx
export function formatNumber(num: number) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num.toString();
}

// ✅ [story]/[idStory]/components/firstContent/rightContent/components/dataContainer.tsx
// ✅ [story]/[idStory]/components/thirdContent/leftContent/components/listContainer.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/topContent/components/detailDesc.tsx
export function formatDateToString(date: string) {
    try {
        const [datePart, timePart] = date.split(" | ");

        if (!datePart || !timePart) return "Tanggal tidak valid";

        // ubah ke ISO format
        const isoString = `${datePart}T${timePart}`;
        const parsedDate = new Date(isoString);

        if (isNaN(parsedDate.getTime())) {
            return "Tanggal tidak valid";
        }

        return new Intl.DateTimeFormat("en-EN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }).format(parsedDate);

    } catch (error) {
        console.error("Format date error:", error);
        return "Tanggal tidak valid";
    }
}

// ✅ lib/firebase/service.ts
export function formatDateTime(date: Date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} | ${hours}:${minutes}:${seconds}`;
}

// ✅ components/components/fourthContent/rightContent/content.tsx
export function parseDate(dateStr: string) {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
}

// ✅ components/components/secondContent/components/topPopular.tsx
// ✅ components/components/secondContent/components/lastUpdateContainer.tsx
// ✅ components/components/thirdContent/content.tsx
// ✅ [story]/[idStory]/components/thirdContent/content.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/content.tsx
// ✅ [story]/[idStory]/[chapter]/[idChapter]/components/bottomContent/rightContent/content.tsx
export function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // ❗ hapus karakter aneh
        .replace(/\s+/g, "-")         // spasi → dash
        .replace(/-+/g, "-");         // double dash → single
}

// ✅ admin/mycontents/story/components/content.tsx
export async function urlToFile(imageUrl: string, filename: string) {
    if (!filename.endsWith(".jpg") && !filename.endsWith(".png")) return null;

    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
}

// ✅ template/uiHelper.tsx
export function countComments(comments: CommentData[]): number {
    if (comments.length === 0) return 0;

    return comments.reduce((total, comment) => {
        return total + 1 + (comment.replies ? countComments(comment.replies) : 0);
    }, 0);
}

export function safeDate(dateStr?: string) {
    if (!dateStr) return new Date();

    const formatted = dateStr.replace(' | ', 'T');
    const d = new Date(formatted);

    return isNaN(d.getTime()) ? new Date() : d;
}