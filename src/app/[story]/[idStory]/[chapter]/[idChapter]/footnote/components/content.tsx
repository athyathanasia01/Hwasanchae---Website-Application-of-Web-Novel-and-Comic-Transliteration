"use client";

// technical
import { useEffect, useState } from "react";

// components
import FootnoteContainer from "./footnoteContainer";

// template 
import { FootnoteInput } from "@hwasanchae/app/template/story/footnote"; // ✅ 

// style
import style from "../../@modal/(.)footnote/components/styles/Content.module.scss";

type Props = {
    footnote: FootnoteInput | null;
}

export default function Content({ footnote }: Props) {
    const [dataFootnote, setDataFootnote] = useState<FootnoteInput | null>(null);

    useEffect(() => {
        setDataFootnote(footnote);
    }, [footnote])

    return (
        dataFootnote ? 
            <FootnoteContainer data={dataFootnote} />
        : 
            <span className={style.content__notFound}>Footnote Note Found</span>
    )
}