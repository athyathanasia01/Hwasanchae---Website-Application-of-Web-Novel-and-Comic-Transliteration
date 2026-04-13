// technical
import Image from "next/image"

// template
import { QuoteItem } from "@hwasanchae/app/template/hwasanchae/quote"; // ✅ 
import { ConditionNavigation } from "@hwasanchae/app/template/variants"; // ✅ 

// style
import style from "../../../styles/fourthContent/leftContent/componentStyle/RandomQuoteContent.module.scss";

type Props = {
    randomQuote: QuoteItem;
    conditionNav: ConditionNavigation;
}

export default function RandomQuoteContent({ randomQuote, conditionNav }: Props) {
    return (
        <div className={`${style.randomQuote} ${conditionNav === 'close' && style[`randomQuote--close`]}`}>
            <Image
                src="/image/quote_logo.png"
                alt="Logo Quote Random"
                width={35}
                height={35}
            />
            <span className={style.randomQuote__title}>Random Quote of The Novel</span>
            <div className={style.randomQuote__randomQuoteContainer}>
                <div className={style.randomQuote__randomQuoteContainer__quoteContainer}>
                    <span className={style.randomQuote__randomQuoteContainer__quoteContainer__unquote}>"</span>
                    <span className={style.randomQuote__randomQuoteContainer__quoteContainer__quote}>{randomQuote.quote}</span>
                </div>
                <span className={style.randomQuote__randomQuoteContainer__person}>{randomQuote.person}</span>
            </div>
        </div>
    )
}