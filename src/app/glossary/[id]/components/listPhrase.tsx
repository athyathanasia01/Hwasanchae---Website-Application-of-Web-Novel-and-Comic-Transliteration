// style
import style from "./styles/ListPhrase.module.scss";

type Props = {
    phrase: string;
    meaning: string;
}

export default function ListPhrase({ phrase, meaning }: Props) {
    return (
        <div className={style.listPhrase}>
            <span className={style.listPhrase__phrase}>{phrase}</span>
            <p className={style.listPhrase__meaning}>{meaning}</p>
        </div>
    )
}