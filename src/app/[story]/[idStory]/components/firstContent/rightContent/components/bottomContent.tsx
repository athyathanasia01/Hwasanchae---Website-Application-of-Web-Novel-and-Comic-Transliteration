// template
import { Tag } from "@hwasanchae/app/template/story/story" // ✅ 

// style
import style from "../../../styles/firstContent/rightContent/componentStyle/BottomContent.module.scss";

type Props = {
    allTags: Tag[];
}

export default function BottomContent({ allTags }: Props) {
    return (
        <ul className={style.bottomContent}>
            {allTags.map(tag => (
                <li className={style.bottomContent__list} key={tag.index}># {tag.tag}</li>
            ))}
        </ul>
    )
}