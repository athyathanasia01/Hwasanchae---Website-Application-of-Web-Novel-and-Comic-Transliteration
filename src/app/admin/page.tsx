"use client";

// technical
import React from "react";

// style
import "./styles/Admin.module.scss";

export default function Page({ children }: { children: React.ReactNode }) {
    return (
        <div>{children}</div>
    )
}