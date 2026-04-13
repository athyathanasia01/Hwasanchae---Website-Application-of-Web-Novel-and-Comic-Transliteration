// style 
import style from "../../styles/topContent/componentStyle/TitleDesc.module.scss";

type Props = {
    title: string;
    chapter: string;
}

export default function TitleDescription(
    {
        title,
        chapter
    }: Props
) {
    return (
        <span className={style.title}>{title} - {chapter}</span>
    )
}