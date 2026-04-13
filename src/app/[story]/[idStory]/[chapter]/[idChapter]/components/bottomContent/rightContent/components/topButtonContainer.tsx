// style 
import style from "../../../styles/bottomContent/rightContent/componentStyle/TopButtonContainer.module.scss";

type Props = {
    isLike: Boolean;
    handleOnClickLike: () => void;
    isBookmark: Boolean;
    handleOnClickBookmark: () => void;
}

export default function TopButtonContainer({ isLike, handleOnClickLike, isBookmark, handleOnClickBookmark }: Props) {
    return (
        <div className={style.topButtonContainer}>
            <button className={style.topButtonContainer__button} onClick={handleOnClickLike}>
                <span className={style.topButtonContainer__button__text}>{isLike ? "You like this chapter" : "Like this chapter"}</span>
                {isLike ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 15" id="Heart--Streamline-Core" height="15" width="15">
                        <desc>
                            Heart Streamline Icon: https://streamlinehq.com
                        </desc>
                        <g id="heart--reward-social-rating-media-heart-it-like-favorite-love">
                            <path id="Union" fill="#ff0e00" fillRule="evenodd" d="M4.311214285714285 1.1626285714285716c1.0505678571428572 0.076125 2.145257142857143 0.5882464285714286 3.193157142857143 1.6247142857142856 1.047632142857143 -1.0361785714285714 2.1413571428571427 -1.5473249999999998 3.19095 -1.621757142857143 1.1845714285714284 -0.08401071428571427 2.2317857142857145 0.39475714285714286 2.9895 1.150125 1.489607142857143 1.48515 1.9573928571428572 4.172528571428571 0.10896428571428571 6.021 -0.006214285714285714 0.006235714285714285 -0.012642857142857141 0.012321428571428572 -0.019178571428571427 0.018235714285714286L7.864007142857143 13.708821428571428c-0.20411785714285716 0.18482142857142855 -0.5151642857142857 0.18482142857142855 -0.7192821428571429 0L1.2341035714285713 8.354946428571429c-0.006535714285714286 -0.005914285714285714 -0.01292142857142857 -0.012 -0.019157142857142855 -0.018235714285714286 -1.8581035714285714 -1.8581035714285714 -1.3928121428571427 -4.545792857142858 0.10172142857142856 -6.029785714285714 0.759525 -0.7541785714285714 1.8088714285714285 -1.2302035714285715 2.9945464285714283 -1.1442964285714283Z" clipRule="evenodd" strokeWidth="1.0714"></path>
                        </g>
                    </svg>
                :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 15" id="Heart--Streamline-Core-Remix" height="15" width="15">
                        <desc>
                            Heart Streamline Icon: https://streamlinehq.com
                        </desc>
                        <g id="Free Remix/Interface Essential/heart--reward-social-rating-media-heart-it-like-favorite-love">
                            <path id="Vector" stroke="#ff0e00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3393" d="M7.490925 13.280035714285715 1.710942857142857 7.928421428571428c-3.1500964285714286 -3.1675392857142857 1.444992857142857 -9.300139285714286 5.779982142857143 -4.339092857142857 4.334967857142857 -4.946582142857142 8.973396428571428 1.1860178571428572 5.780003571428571 4.339092857142857L7.490925 13.280035714285715Z"></path>
                        </g>
                    </svg>
                }
            </button>
            <button className={style.topButtonContainer__button} onClick={handleOnClickBookmark}>
                <span className={style.topButtonContainer__button__text}>{isBookmark ? "Remove from Bookmark" : "Add to Bookmark"}</span>
                {isBookmark ?
                    <svg id="Bookmark-Filled--Streamline-Carbon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" height="15" width="15">
                        <desc>
                            Bookmark Filled Streamline Icon: https://streamlinehq.com
                        </desc>
                        <defs></defs>
                        <path d="M11.25 0.9375H3.75a0.9375 0.9375 0 0 0 -0.9375 0.9375v12.1875l4.6875 -2.36896875L12.1875 14.0625V1.875a0.9375 0.9375 0 0 0 -0.9375 -0.9375Z" fill="#ffffff" strokeWidth="0.4688"></path>
                        <path id="_Transparent_Rectangle_" d="M0 0h15v15H0Z" fill="none" strokeWidth="0.4688"></path>
                    </svg>
                :
                    <svg id="Bookmark--Streamline-Carbon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" height="15" width="15">
                        <desc>
                            Bookmark Streamline Icon: https://streamlinehq.com
                        </desc>
                        <defs></defs>
                        <title>bookmark</title>
                        <path d="M11.25 1.875v10.6640625l-3.328125 -1.6828124999999998 -0.421875 -0.2109375 -0.421875 0.2109375L3.75 12.5390625V1.875h7.5m0 -0.9375H3.75a0.9375 0.9375 0 0 0 -0.9375 0.9375v12.1875l4.6875 -2.34375 4.6875 2.34375V1.875a0.9375 0.9375 0 0 0 -0.9375 -0.9375Z" fill="#ffffff" strokeWidth="0.4688"></path>
                        <path id="_Transparent_Rectangle_" d="M0 0h15v15H0Z" fill="none" strokeWidth="0.4688"></path>
                    </svg>
                }
            </button>
        </div>
    )
}