// style
import style from "../../../styles/contentTop/right/componentStyle/Tags.module.scss";

type Props = {
    name: string;
    handleOnClickTag: () => void;
}

export default function Tags({ name, handleOnClickTag }: Props) {
    return (
        <div className={style.tag}>
            <button onClick={handleOnClickTag}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" id="Close--Streamline-Majesticons" height="16" width="16">
                    <desc>
                        Close Streamline Icon: https://streamlinehq.com
                    </desc>
                    <path stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3333" d="M8 8 4.666666666666666 4.666666666666666m3.333333333333333 3.333333333333333 3.333333333333333 3.333333333333333m-3.333333333333333 -3.333333333333333 3.333333333333333 -3.333333333333333m-3.333333333333333 3.333333333333333 -3.333333333333333 3.333333333333333"></path>
                </svg>
            </button>
            <span>{name}</span>
        </div>
    )
}