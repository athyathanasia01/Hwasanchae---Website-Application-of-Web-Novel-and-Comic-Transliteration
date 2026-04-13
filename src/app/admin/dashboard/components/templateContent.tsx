// technical
import Link from "next/link";
import { ReactNode } from "react";

// style
import style from "./styles/TemplateContent.module.scss";

type Props = {
    name: string;
    link: string;
    children: ReactNode;
}

export default function TemplateContent({ name, link, children }: Props) {
    return (
        <div className={style.content}>
            <div className={style.content__topWrapper}>
                <span className={style.content__topWrapper__title}>{name}</span>
                <span className={style.content__topWrapper__linkEdit}>
                    <Link href={link}>Edit</Link>
                </span>
            </div>
            { children }
        </div>
    )
}