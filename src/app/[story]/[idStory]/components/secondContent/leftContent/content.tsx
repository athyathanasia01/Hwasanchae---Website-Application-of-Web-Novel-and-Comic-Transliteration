// style
import style from "../../styles/secondContent/leftContent/Content.module.scss";

type Props = {
    summary: string;
    textMore: string;
    handleClickMore: () => void;
    condition: string;
}

export default function LeftContent({ summary, textMore, handleClickMore, condition }: Props) {
    return (
        <div className={`${style.summaryContainer} ${style[`summaryContainer--${condition}`]}`}>
            <span className={style.summaryContainer__title}>Summary</span>
            <div className={style.summaryContainer__summaryContent}>
                <p className={style.summaryContainer__summaryContent__content}>{summary}</p>
                <span className={style.summaryContainer__summaryContent__more} onClick={handleClickMore}>
                    {textMore}
                </span>
            </div>
        </div>
    )
}