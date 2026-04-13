"use client";

// technical
import { ReactNode, useRef } from "react";

// style
import style from "./Modal.module.scss";

export default function Modal({ children }: { children: ReactNode }) {
    const overlay = useRef(null);

    return (
        <div
            ref={overlay}
            className={style.overlay}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={style.overlay__container}
            >
                { children }
            </div>
        </div>
    )
}