// template
import { FootnoteInput } from "@hwasanchae/app/template/story/footnote"; // ✅ 

// components
import FootnoteContent from "./footnoteContent";

// style
import style from "../../styles/bottomContent/componentStyle/FootnoteContainer.module.scss";

type Props = {
    addFootnote: () => void;
    removeFootnote: (id: number) => void;
    updateFootnote: (id: number, field: "phrase" | "meaning", value: string) => void;
    footnotes: FootnoteInput[];
}

export default function FootnotePage(
    {
        addFootnote,
        removeFootnote,
        updateFootnote,
        footnotes
    }: Props
) {
    return (
        <div className={style.footnoteContainer}>
            <span className={style.footnoteContainer__title}>Footnote</span>
            <div className={style.footnoteContainer__mapFootnote}>
                {footnotes.map((footnote, index) => (
                    <FootnoteContent 
                        key={index}
                        idFootnote={index + 1} 
                        handleDeleteFootnote={() => removeFootnote(index)}
                        valuePhrase={footnote.phrase}
                        handleChangePhrase={(value) => updateFootnote(index, "phrase", value)}
                        valueMeaning={footnote.meaning}
                        handleChangeMeaning={(value) => updateFootnote(index, "meaning", value)}
                    />
                ))}
            </div>
            <div className={style.footnoteContainer__footnoteBlur}>
                <button
                    className={style.footnoteContainer__footnoteBlur__buttonAddFootnote}
                    onClick={addFootnote}
                >
                    Add New Footnote
                </button>
            </div>
        </div>
    )
}