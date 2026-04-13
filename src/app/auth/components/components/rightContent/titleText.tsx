// style
import style from "../styles/rightContent/TitleText.module.scss";

type Props = {
    textTitle: string;
}

export default function TitleText({ textTitle }: Props) {
    return (
        <span className={style.textTitle}>{textTitle}</span>
    )
}