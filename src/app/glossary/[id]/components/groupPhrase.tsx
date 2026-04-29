// components
import ListPhrase from "./listPhrase";

// template
import { FootnoteInput } from "@hwasanchae/app/template/story/footnote"; // ✅ 

// style
import style from "./styles/GroupPhrase.module.scss";

type Props = {
    groupAlpha: string;
    listPhrase: FootnoteInput[];
}

export default function GroupPhrase({ groupAlpha, listPhrase }: Props) {
    return (
        <div className={style.groupPhrase}>
            <h1 className={style.groupPhrase__title}>{groupAlpha}</h1>
            <ul className={style.groupPhrase__unorderList}>
                {listPhrase.map((footnote, index) => (
                    <ListPhrase 
                        key={index}
                        phrase={footnote.phrase} 
                        meaning={footnote.meaning} 
                    />
                ))}
            </ul>
        </div>
    )
}