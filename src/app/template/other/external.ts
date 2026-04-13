// ✅ PublicLayoutClient.tsx
// ✅ components/footer/content.tsx
// ✅ components/footer/topContent/content.tsx
// ✅ components/footer/topContent/leftSide/content.tsx
// ✅ (this)
export type External = {
    name: string;
    link: string;
}

// ✅ layout.tsx
export const externalList: External[] = [
    {
        name: "About Us",
        link: "http://localhost:3000/about"
    },
    {
        name: "Help and Feedback Center",
        link: "http://localhost:3000/helpdesk"
    },
    {
        name: "Request Translation",
        link: "http://localhost:3000/request"
    },
    {
        name: "Career and Recruitment",
        link: "http://localhost:3000/career"
    },
];