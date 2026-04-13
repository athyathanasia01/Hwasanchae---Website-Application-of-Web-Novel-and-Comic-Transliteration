// style
import style from "../../../styles/thirdContent/rightContent/componentStyle/ButtonNav.module.scss";

type Props = {
    handleOnClick: () => void;
    buttonTitle: string;
    chapterName: string;
}

export default function ButtonNavigation(
    { 
        handleOnClick, 
        buttonTitle, 
        chapterName 
    }: Props
) {
    return (
        <button 
            className={style.button}
            onClick={handleOnClick}
        >
            <span className={style.button__nav}>{buttonTitle}</span>
            <span className={style.button__title}>{chapterName}</span>
        </button>
    )
}