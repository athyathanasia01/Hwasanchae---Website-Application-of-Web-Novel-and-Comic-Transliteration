// ✅ components/navbar/content.tsx
// ✅ components/navbar/components/sideLeft.tsx
// ✅ components/navbar/components/listMenu.tsx
// ✅ (this)
export type MenuNavBar = {
    name: string;
    href: string;
    navigation: boolean | null;
}

// ✅ PublicLayoutClient.tsx
// ✅ components/navbar/content.tsx
export const menusPublic: MenuNavBar[] = [
    { name: "Home", href: "/", navigation: false },
    { name: "About Us", href: "/about", navigation: true },
    { name: "Bookmark", href: "/bookmark", navigation: true },
    { name: "Glossary", href: "/glossary", navigation: true }
];

// ✅ admin/AdminLayoutClient.tsx
export const menusAdmin: MenuNavBar[] = [
    { name: "Dashboard", href: "/admin/dashboard", navigation: true },
    { name: "My Contents", href: "/admin/mycontents", navigation: true },
    { name: "Profile", href: "/admin/profile", navigation: true },
    { name: "Detail Story or Chapter", href: "/admin/mycontents/story", navigation: false },
    { name: "Analytics", href: "/admin/analytics", navigation: true },
]

// ✅ dev/DevLayoutClient.tsx
export const menusDev: MenuNavBar[] = [
    { name: "Dashboard", href: "/dev/dashboard", navigation: true },
    { name: "Profile", href: "/dev/profile", navigation: true },
]