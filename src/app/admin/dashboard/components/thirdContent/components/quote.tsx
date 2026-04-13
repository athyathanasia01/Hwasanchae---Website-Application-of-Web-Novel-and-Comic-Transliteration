// style
import style from "../../styles/thirdContent/componentStyle/Quote.module.scss";

type Props = {
    name?: string;
    quote?: string;
}

export default function Quote({ name, quote }: Props) {
    return (
        <div className={style.quoteContainer}>
            <span className={style.quoteContainer__quote}>{quote}</span>
            <span className={style.quoteContainer__name}>{name}</span>
        </div>
    )
}