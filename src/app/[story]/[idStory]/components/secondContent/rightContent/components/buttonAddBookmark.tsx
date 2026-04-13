// style 
import style from "../../../styles/secondContent/rightContent/componentStyle/ButtonAddBookmark.module.scss";

type Props = {
    handleOnClickBookmark: () => void;
    isBookmarked: Boolean;
}

export default function ButtonAddBookmark(
    { 
        handleOnClickBookmark, 
        isBookmarked,  
    }: Props
) {
    return (
        <button className={style.buttonBookmark} onClick={handleOnClickBookmark}>
            <span className={style.buttonBookmark__text}>
                {isBookmarked ?
                    "Remove from Bookmark"
                : 
                    "Add to Bookmark"
                }
            </span>
            {isBookmarked ?
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" id="Bookmark--Streamline-Iconoir" height="20" width="20">
                    <desc>
                        Bookmark Streamline Icon: https://streamlinehq.com
                    </desc>
                    <path d="M4.166666666666667 17.5V4.166666666666667c0 -0.920475 0.7461916666666667 -1.6666666666666667 1.6666666666666667 -1.6666666666666667h8.333333333333334c0.9205000000000001 0 1.6666666666666667 0.7461916666666667 1.6666666666666667 1.6666666666666667v13.333333333333334l-4.932083333333334 -3.1705833333333335c-0.549 -0.353 -1.2535 -0.353 -1.8025 0L4.166666666666667 17.5Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            :
                <svg viewBox="-0.625 -0.625 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" id="Bookmark--Streamline-Iconoir" height="20" width="20">
                    <desc>
                        Bookmark Streamline Icon: https://streamlinehq.com
                    </desc>
                    <path d="M2.778828125 17.85578125V2.778828125c0 -1.0408593750000001 0.843828125 -1.8846093750000001 1.8846093750000001 -1.8846093750000001h9.423125c1.0408593750000001 0 1.8846093750000001 0.84375 1.8846093750000001 1.8846093750000001v15.076953125000001l-5.57703125 -3.585234375c-0.62078125 -0.399140625 -1.417421875 -0.399140625 -2.0382031250000003 0l-5.577109375 3.585234375Z" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25"></path>
                </svg>
            }
        </button>
    )
}