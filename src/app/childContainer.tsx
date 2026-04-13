"use client";

// technical
import { usePathname } from "next/navigation";
import React from "react";

export default function ChildrenContainer({ children }: { children: React.ReactNode }) {
    const pathName = usePathname();

    const adminPage = ["/admin/dashboard", "/admin/mycontents", "/admin/analytics"];

    return (
        adminPage.includes(pathName) ?
            <div className="flex flex-col mt-3 ml-4 items-center">
                { children }
            </div>
        :
            <div>
                { children }
            </div>
    )
}