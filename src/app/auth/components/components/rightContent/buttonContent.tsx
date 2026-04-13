// style
import style from "../styles/rightContent/ButtonContent.module.scss";

type Props = {
    textButton: string;
}

export default function ButtonContent({ textButton }: Props) {
    return (
        <button className={style.buttonContent} type="submit">{textButton}</button>
    )
}