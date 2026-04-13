// technical
import Image from "next/image"

// helper
import { formatNumber } from "@hwasanchae/app/template/serverHelper"; // ✅ 

// template
import { Tag } from "@hwasanchae/app/template/story/story"; // ✅ 

// style
import style from "../../../styles/fourthContent/rightContent/componentStyle/CardContainer.module.scss";
import { read } from "fs";

type Props = {
    image: string; 
    title: string;
    writer: string;
    translator: string;
    translatedLanguage: string;
    status: string;
    like: number;
    read: number;
    comment: number;
    isBookmarked: Boolean; 
    tags: Tag[];
    summary: string;
    handleOnClickBookmark: () => void; 
    handleToDetail: () => void;
}

export default function CardContainer(
    { 
        image, 
        title, 
        writer, 
        translator, 
        translatedLanguage,
        status,
        like, 
        read,
        comment,
        isBookmarked, 
        tags, 
        summary, 
        handleOnClickBookmark, 
        handleToDetail 
    }: Props
) {
    return (
        <div className={style.cardContainer}>
            <div className={style.cardContainer__imageWrapper}>
                <div className={`${style.cardContainer__imageWrapper__status} ${style[`cardContainer__imageWrapper__status--${status === 'On Going' ? 'ongoing' : status === 'Hiatus' ? 'hiatus' : status === 'Completed' ? 'completed' : ''}`]}`}>
                    {status}
                </div>
                <Image 
                    className={style.cardContainer__imageWrapper__image}
                    src={image} 
                    alt={title}
                    fill
                />
            </div>
            <div className={style.cardContainer__detailRight}>
                <div className={style.cardContainer__detailRight__top}>
                    <div className={style.cardContainer__detailRight__top__left}>
                        <span className={style.cardContainer__detailRight__top__left__title} onClick={handleToDetail}>{title}</span>
                        <div className={style.cardContainer__detailRight__top__left__letter}>
                            <div className={style.cardContainer__detailRight__top__left__letter__data}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="Shield-Star--Streamline-Solar">
                                    <desc>
                                        Shield Star Streamline Icon: https://streamlinehq.com
                                    </desc>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.37752 5.08241C3 5.62028 3 7.21907 3 10.4167v1.5747c0 5.638 4.23896 8.3741 6.89856 9.5359C10.62 21.8424 10.9807 22 12 22s1.38 -0.1576 2.1014 -0.4727C16.761 20.3655 21 17.6294 21 11.9914v-1.5747c0 -3.19763 0 -4.79642 -0.3775 -5.33429 -0.3775 -0.53787 -1.8808 -1.05245 -4.8874 -2.08162l-0.5728 -0.19607C13.595 2.26824 12.8114 2 12 2c-0.8114 0 -1.595 0.26824 -3.16228 0.80472l-0.57281 0.19607C5.25832 4.02996 3.75503 4.54454 3.37752 5.08241Zm7.48378 3.28094 -0.1311 0.23514c-0.144 0.25828 -0.216 0.38742 -0.3282 0.47263 -0.1123 0.08521 -0.2521 0.11684 -0.53165 0.1801l-0.25454 0.05759c-0.98387 0.22261 -1.4758 0.33392 -1.59284 0.71029 -0.11704 0.3764 0.21833 0.7685 0.88907 1.5529l0.17353 0.2029c0.1906 0.2229 0.2859 0.3343 0.32878 0.4722 0.04287 0.1379 0.02846 0.2865 -0.00036 0.5839l-0.02623 0.2708c-0.10141 1.0464 -0.15211 1.5697 0.1543 1.8023 0.30641 0.2326 0.76704 0.0205 1.68824 -0.4036l0.2383 -0.1098c0.2618 -0.1205 0.3927 -0.1808 0.5314 -0.1808s0.2696 0.0603 0.5314 0.1808l0.2383 0.1098c0.9212 0.4241 1.3818 0.6362 1.6882 0.4036 0.3065 -0.2326 0.2557 -0.7559 0.1543 -1.8023l-0.0262 -0.2708c-0.0288 -0.2973 -0.0432 -0.446 -0.0003 -0.5839 0.0428 -0.1379 0.1381 -0.2493 0.3287 -0.4722l0.1736 -0.2029c0.6707 -0.7844 1.0061 -1.1765 0.889 -1.5529 -0.117 -0.37637 -0.6089 -0.48768 -1.5928 -0.71029l-0.2546 -0.05759c-0.2795 -0.06326 -0.4193 -0.09489 -0.5316 -0.1801 -0.1122 -0.0852 -0.1842 -0.21434 -0.3282 -0.47262l-0.1311 -0.23515C12.6321 7.45445 12.3787 7 12 7c-0.3787 0 -0.6321 0.45445 -1.1387 1.36335Z" fill="currentColor" strokeWidth="1"></path>
                                </svg>
                                <span className={style.cardContainer__detailRight__top__left__letter__data__detail}>{writer}</span>
                            </div>
                            <div className={style.cardContainer__detailRight__top__left__letter__data}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" id="Interpreter-Mode-Fill--Streamline-Rounded-Fill-Material">
                                    <desc>
                                        Interpreter Mode Fill Streamline Icon: https://streamlinehq.com
                                    </desc>
                                    <path fill="currentColor" d="M41.25 32.75c-0.7667 0 -1.4167 -0.2667 -1.95 -0.8 -0.5333 -0.5333 -0.8 -1.1833 -0.8 -1.95v-5c0 -0.7667 0.2667 -1.4167 0.8 -1.95 0.5333 -0.5333 1.1833 -0.8 1.95 -0.8 0.7667 0 1.4167 0.2667 1.95 0.8 0.5333 0.5333 0.8 1.1833 0.8 1.95v5c0 0.7667 -0.2667 1.4167 -0.8 1.95 -0.5333 0.5333 -1.1833 0.8 -1.95 0.8ZM29.95 23c-2.1 0 -3.875 -0.725 -5.325 -2.175 -1.45 -1.45 -2.175 -3.225 -2.175 -5.325s0.725 -3.875 2.175 -5.325C26.075 8.725 27.85 8 29.95 8s3.875 0.725 5.325 2.175c1.45 1.45 2.175 3.225 2.175 5.325s-0.725 3.875 -2.175 5.325C33.825 22.275 32.05 23 29.95 23ZM17.2 40c-0.8333 0 -1.5417 -0.2917 -2.125 -0.875 -0.5833 -0.5833 -0.875 -1.2917 -0.875 -2.125v-1.7c0 -1.1667 0.3083 -2.225 0.925 -3.175 0.6167 -0.95 1.4583 -1.6583 2.525 -2.125 1.5667 -0.7 3.375 -1.375 5.425 -2.025 2.05 -0.65 4.3417 -0.975 6.875 -0.975 0.3667 0 0.6417 0.1417 0.825 0.425 0.1833 0.2833 0.225 0.6083 0.125 0.975 -0.2667 0.9667 -0.375 1.95 -0.325 2.95 0.05 1 0.225 1.9667 0.525 2.9 0.2333 0.6667 0.525 1.3167 0.875 1.95s0.7583 1.2333 1.225 1.8c0.3667 0.4 0.45 0.8333 0.25 1.3s-0.5333 0.7 -1 0.7H17.2Zm24.05 0c-0.2 0 -0.375 -0.075 -0.525 -0.225 -0.15 -0.15 -0.225 -0.325 -0.225 -0.525V36.7c-1.5 -0.2333 -2.8 -0.85 -3.9 -1.85s-1.7667 -2.25 -2 -3.75c-0.0333 -0.2333 0.0167 -0.4333 0.15 -0.6 0.1333 -0.1667 0.3167 -0.25 0.55 -0.25 0.2 0 0.375 0.0583 0.525 0.175 0.15 0.1167 0.2417 0.275 0.275 0.475 0.1667 1.2667 0.7417 2.3083 1.725 3.125 0.9833 0.8167 2.125 1.225 3.425 1.225 1.2667 0 2.3833 -0.4083 3.35 -1.225 0.9667 -0.8167 1.5667 -1.8583 1.8 -3.125 0.0333 -0.2 0.1333 -0.3583 0.3 -0.475 0.1667 -0.1167 0.35 -0.175 0.55 -0.175 0.2 0 0.375 0.0667 0.525 0.2 0.15 0.1333 0.2083 0.3 0.175 0.5 -0.1667 1.5333 -0.8167 2.8167 -1.95 3.85s-2.4667 1.6667 -4 1.9v2.55c0 0.2 -0.075 0.375 -0.225 0.525 -0.15 0.15 -0.325 0.225 -0.525 0.225Zm-28.8 -24.5c0 -1.0667 0.2167 -2.075 0.65 -3.025 0.4333 -0.95 1.0333 -1.775 1.8 -2.475 0.7667 -0.7 1.6417 -1.21667 2.625 -1.55 0.9833 -0.33333 2.0083 -0.46667 3.075 -0.4 0.3333 0.03333 0.5583 0.19167 0.675 0.475 0.1167 0.28333 0.075 0.55833 -0.125 0.825 -0.5667 0.8333 -0.9917 1.775 -1.275 2.825 -0.2833 1.05 -0.425 2.1583 -0.425 3.325s0.1417 2.275 0.425 3.325c0.2833 1.05 0.7083 1.9917 1.275 2.825 0.1667 0.2667 0.2 0.5417 0.1 0.825s-0.3 0.4583 -0.6 0.525c-1.0667 0.0667 -2.1 -0.0583 -3.1 -0.375s-1.8833 -0.8417 -2.65 -1.575c-0.7667 -0.7333 -1.3667 -1.575 -1.8 -2.525s-0.65 -1.9583 -0.65 -3.025ZM2 37v-1.7c0 -1.2333 0.29167 -2.2833 0.875 -3.15 0.58333 -0.8667 1.44167 -1.6167 2.575 -2.25 1.03333 -0.5667 2.26667 -1.075 3.7 -1.525 1.4333 -0.45 3.05 -0.825 4.85 -1.125 0.3333 -0.0667 0.5583 0.0667 0.675 0.4 0.1167 0.3333 0.025 0.6 -0.275 0.8 -1.1667 0.9667 -1.9917 2.0333 -2.475 3.2 -0.4833 1.1667 -0.725 2.3833 -0.725 3.65V37c0 0.2667 0.025 0.5417 0.075 0.825 0.05 0.2833 0.1083 0.5583 0.175 0.825 0.1 0.3333 0.0583 0.6417 -0.125 0.925s-0.4417 0.425 -0.775 0.425H5c-0.83333 0 -1.54167 -0.2917 -2.125 -0.875C2.29167 38.5417 2 37.8333 2 37Z" strokeWidth="1"></path>
                                </svg>
                                <span className={style.cardContainer__detailRight__top__left__letter__data__detail}>{translator}</span>
                            </div>
                            <div className={style.cardContainer__detailRight__top__left__letter__data}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" id="Translate-Fill--Streamline-Phosphor-Fill">
                                    <desc>
                                        Translate Fill Streamline Icon: https://streamlinehq.com
                                    </desc>
                                    <path d="m169.8133 130.4696 19.6784 39.3437h-39.3568l8.3104 -16.5946ZM253.44 23.4667v209.0666c0 11.5468 -9.3599 20.9072 -20.9067 20.9067H23.4667c-11.5468 0.0005 -20.9067 -9.3599 -20.9067 -20.9067V23.4667C2.56 11.9202 11.9202 2.56 23.4667 2.56h209.0666c11.5465 0 20.9067 9.3602 20.9067 20.9067Zm-22.0043 183.4821 -52.2666 -104.5333c-3.5895 -7.2021 -13.6294 -7.8176 -18.0718 -1.108 -0.2357 0.3559 -0.4493 0.7259 -0.6397 1.108l-17.2219 34.4698c-11.0781 -2.1697 -21.584 -6.6195 -30.8504 -13.0666 14.443 -16.3514 23.3795 -36.8298 25.5454 -58.5387H159.36c8.047 0 13.0763 -8.7111 9.0529 -15.68 -1.8674 -3.2343 -5.3183 -5.2267 -9.0529 -5.2267h-52.2667V33.92c0 -8.047 -8.7111 -13.0763 -15.68 -9.0529 -3.2342 1.8674 -5.2266 5.3183 -5.2266 9.0529v10.4533H33.92c-8.047 0 -13.0763 8.7111 -9.0529 15.68 1.8674 3.2343 5.3183 5.2267 9.0529 5.2267h82.9472c-2.0738 16.4937 -9.0365 31.9892 -19.992 44.492 -4.6412 -5.4181 -8.5915 -11.3918 -11.76 -17.7837 -3.8029 -7.0917 -13.8566 -7.4073 -18.0968 -0.5681 -1.8471 2.9793 -2.0779 6.6861 -0.6147 9.8715 4.0009 8.0678 9.0059 15.5973 14.896 22.4094 -13.923 9.6264 -30.4529 14.7732 -47.3797 14.7522 -8.047 0 -13.0763 8.7111 -9.0529 15.68 1.8674 3.2345 5.3181 5.2269 9.0529 5.2267 22.6934 0.0242 44.7712 -7.378 62.8637 -21.0765 10.9474 8.3676 23.4716 14.4386 36.8219 17.849l-25.4147 50.8163c-3.601 7.2021 1.9448 15.6016 9.9825 15.1191 3.7303 -0.2239 7.0578 -2.4209 8.729 -5.7634l12.7792 -25.5845h60.2635l12.7792 25.5845c3.601 7.2021 13.6481 7.8052 18.0847 1.0856 2.0591 -3.1186 2.298 -7.0988 0.6267 -10.4413Z" strokeWidth="1"></path>
                                </svg>
                                <span className={style.cardContainer__detailRight__top__left__letter__data__detail}>{translatedLanguage}</span>
                            </div>
                        </div>
                        <div className={style.cardContainer__detailRight__top__left__more}>
                            <div className={style.cardContainer__detailRight__top__left__more__data}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Visible--Streamline-Core">
                                    <desc>
                                        Visible Streamline Icon: https://streamlinehq.com
                                    </desc>
                                    <g id="visible--eye-eyeball-open-view">
                                        <path id="Subtract" fill="currentColor" fillRule="evenodd" d="M2.9327 3.49099C4.0559 2.68177 5.4556 2 7 2c1.54441 0 2.9441 0.68177 4.0673 1.49099 1.1273 0.81215 2.0197 1.78397 2.5599 2.4369l0.0045 0.00553c0.2413 0.3002 0.3683 0.68062 0.3683 1.06664 0 0.38601 -0.127 0.76644 -0.3683 1.06664l-0.0045 0.00553c-0.5402 0.65292 -1.4326 1.62475 -2.5599 2.43687 -1.1232 0.8092 -2.52289 1.491 -4.0673 1.491 -1.5444 0 -2.9441 -0.6818 -4.0673 -1.491C1.80544 9.69698 0.913028 8.72515 0.37279 8.07223L0.36828 8.0667C0.127025 7.7665 0 7.38607 0 7.00006c0 -0.38602 0.127025 -0.76644 0.36828 -1.06664l0.00451 -0.00553c0.540238 -0.65293 1.43265 -1.62475 2.55991 -2.4369ZM7 9.25c1.24264 0 2.25 -1.00736 2.25 -2.25S8.24264 4.75 7 4.75 4.75 5.75736 4.75 7 5.75736 9.25 7 9.25Z" clipRule="evenodd" strokeWidth="1"></path>
                                    </g>
                                </svg>
                                <span className={style.cardContainer__detailRight__top__left__more__data__detail}>{read}</span>
                            </div>
                            <div className={style.cardContainer__detailRight__top__left__more__data}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Star-1--Streamline-Core">
                                    <desc>
                                        Star 1 Streamline Icon: https://streamlinehq.com
                                    </desc>
                                    <g id="star-1--reward-rating-rate-social-star-media-favorite-like-stars">
                                        <path id="Union" fill="currentColor" fillRule="evenodd" d="M7 0.276855c-0.19843 0 -0.39272 0.056768 -0.55993 0.163603 -0.16508 0.10547 -0.29697 0.255388 -0.38055 0.432443L4.47196 4.07799c-0.00312 0.0063 -0.00611 0.01266 -0.00896 0.01909 -0.00071 0.00159 -0.00183 0.00298 -0.00324 0.00401 -0.00141 0.00103 -0.00306 0.00168 -0.0048 0.00187 -0.00609 0.00067 -0.01217 0.00146 -0.01823 0.00236l-3.495581 0.51786c-0.193204 0.01879 -0.377444 0.09129 -0.531759 0.20949 -0.159672 0.12231 -0.280454 0.28829 -0.3477142 0.47784 -0.06726016 0.18955 -0.0781133 0.39454 -0.0312442 0.59014 0.0466876 0.19483 0.1486564 0.37202 0.2936224 0.51027L2.88283 8.87974l-0.00004 0.00005 0.00587 0.00548c0.00365 0.00342 0.0064 0.00769 0.00798 0.01244 0.00158 0.00474 0.00195 0.00981 0.00107 0.01473l-0.00056 0.00327 -0.60974 3.56839 -0.00015 0.0009c-0.0335 0.1934 -0.01214 0.3923 0.06167 0.5741 0.07391 0.1822 0.19747 0.3399 0.3566 0.4553 0.15914 0.1153 0.34746 0.1837 0.54354 0.1973 0.19569 0.0136 0.39127 -0.0279 0.56457 -0.1197l0.00006 -0.0001 0.00099 -0.0005 3.14948 -1.6645c0.01129 -0.0049 0.0235 -0.0075 0.03585 -0.0075s0.02455 0.0026 0.03585 0.0075l3.14943 1.6645 0.0006 0.0003c0.1734 0.0921 0.3692 0.1337 0.565 0.12 0.1961 -0.0136 0.3844 -0.082 0.5436 -0.1973 0.1591 -0.1154 0.2827 -0.2731 0.3566 -0.4553 0.0738 -0.1818 0.0951 -0.3806 0.0617 -0.5739l-0.0002 -0.0011 -0.6097 -3.5684 -0.0006 -0.00326c-0.0009 -0.00492 -0.0005 -0.00999 0.0011 -0.01473 0.0015 -0.00474 0.0043 -0.00902 0.0079 -0.01244l0.0001 0.00005 0.0058 -0.00558 2.5588 -2.46885c0.1449 -0.13825 0.2469 -0.31542 0.2936 -0.51024 0.0468 -0.1956 0.036 -0.40059 -0.0313 -0.59014 -0.0672 -0.18955 -0.188 -0.35553 -0.3477 -0.47784 -0.1543 -0.1182 -0.3385 -0.1907 -0.5317 -0.20949l-3.49562 -0.51786c-0.00606 -0.0009 -0.01214 -0.00169 -0.01823 -0.00236 -0.00174 -0.00019 -0.0034 -0.00084 -0.00481 -0.00187 -0.00141 -0.00103 -0.00252 -0.00242 -0.00323 -0.00401 -0.00285 -0.00643 -0.00584 -0.01279 -0.00896 -0.01909L7.94048 0.872887C7.8569 0.695838 7.72501 0.545925 7.55994 0.440458 7.39272 0.333623 7.19843 0.276855 7 0.276855Z" clipRule="evenodd" strokeWidth="1"></path>
                                    </g>
                                </svg>
                                <span className={style.cardContainer__detailRight__top__left__more__data__detail}>{like}</span>
                            </div>
                            <div className={style.cardContainer__detailRight__top__left__more__data}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" id="Message--Streamline-Tabler-Filled">
                                    <desc>
                                        Message Streamline Icon: https://streamlinehq.com
                                    </desc>
                                    <path d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-4.724l-4.762 2.857a1 1 0 0 1 -1.508 -0.743L7 21v-2H6a4 4 0 0 1 -3.995 -3.8L2 15V7a4 4 0 0 1 4 -4zm-4 9H8a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m2 -4H8a1 1 0 1 0 0 2h8a1 1 0 0 0 0 -2" strokeWidth="1"></path>
                                </svg>
                                <span className={style.cardContainer__detailRight__top__left__more__data__detail}>{comment}</span>
                            </div>
                        </div>
                    </div>
                    {isBookmarked ? 
                        <svg onClick={handleOnClickBookmark} style={{cursor: "pointer"}} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" id="Bookmark--Streamline-Iconoir" height="20" width="20">
                            <desc>
                                Bookmark Streamline Icon: https://streamlinehq.com
                            </desc>
                            <path d="M4.166666666666667 17.5V4.166666666666667c0 -0.920475 0.7461916666666667 -1.6666666666666667 1.6666666666666667 -1.6666666666666667h8.333333333333334c0.9205000000000001 0 1.6666666666666667 0.7461916666666667 1.6666666666666667 1.6666666666666667v13.333333333333334l-4.932083333333334 -3.1705833333333335c-0.549 -0.353 -1.2535 -0.353 -1.8025 0L4.166666666666667 17.5Z" fill="#000000" stroke="#000000" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    :
                        <svg onClick={handleOnClickBookmark} style={{cursor: "pointer"}} viewBox="-0.625 -0.625 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" id="Bookmark--Streamline-Iconoir" height="20" width="20">
                            <desc>
                                Bookmark Streamline Icon: https://streamlinehq.com
                            </desc>
                            <path d="M2.778828125 17.85578125V2.778828125c0 -1.0408593750000001 0.843828125 -1.8846093750000001 1.8846093750000001 -1.8846093750000001h9.423125c1.0408593750000001 0 1.8846093750000001 0.84375 1.8846093750000001 1.8846093750000001v15.076953125000001l-5.57703125 -3.585234375c-0.62078125 -0.399140625 -1.417421875 -0.399140625 -2.0382031250000003 0l-5.577109375 3.585234375Z" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25"></path>
                        </svg>
                    }
                </div>
                <div className={style.cardContainer__detailRight__bottom}>
                    <ul className={style.cardContainer__detailRight__bottom__tagList}>
                        {tags.map((tag) => (
                            <li className={style.cardContainer__detailRight__bottom__tagList__tag} key={tag.index}>#{tag.tag}</li>
                        ))}
                    </ul>
                    <span className={style.cardContainer__detailRight__bottom__summary}>{summary}</span>
                </div>
            </div>
        </div>
    )
}