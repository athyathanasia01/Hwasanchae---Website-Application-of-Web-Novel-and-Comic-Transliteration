"use client";

// technical
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// components
import FootnoteContainer from "./footnoteContainer";

// template
import { FootnoteInput } from "@hwasanchae/app/template/story/footnote"; // ✅ 

// style
import style from "./styles/Content.module.scss";

type Props = {
    footnote: FootnoteInput | null;
}

export default function Content({ footnote }: Props) {
    const [dataFootnote, setDataFootnote] = useState<FootnoteInput | null>(null);
    const router = useRouter();

    useEffect(() => {
        setDataFootnote(footnote);
    }, [footnote]);
    
    return (
        <div className={style.content}>
            {dataFootnote ?
                <FootnoteContainer data={dataFootnote} />
            :
                <span className={style.content__notFound}>Footnote Not Found</span>
            }
            <button className={style.content__btnClose} onClick={router.back}>Close</button>
        </div>
    )
}