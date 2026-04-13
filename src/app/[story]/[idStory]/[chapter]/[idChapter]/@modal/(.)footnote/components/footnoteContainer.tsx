// template
import { FootnoteInput } from "@hwasanchae/app/template/story/footnote"; // ✅ 

// style
import style from "./styles/FootnoteContainer.module.scss";

type Props = {
    data: FootnoteInput;
}

export default function FootnoteContainer({ data }: Props) {
    return(
        <>
            <label htmlFor="phrase" className={style.modalFootnoteContainer__label}>{data.phrase}</label>
            <span className={style.modalFootnoteContainer__content}>{data.meaning}</span>
        </>
    )
}