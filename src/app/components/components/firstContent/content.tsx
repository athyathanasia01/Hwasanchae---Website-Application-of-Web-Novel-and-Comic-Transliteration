// technical
import Marquee from "react-fast-marquee";

// style
import style from "../styles/firstContent/Content.module.scss";

type Props = {
    fyi: string[];
}

export default function FirstContent({ fyi }: Props) {
    return (
        <div className={style.contentFirst}>
            {fyi.length !== 0 ?
                <Marquee
                    className={style.contentFirst__marquee}
                    pauseOnHover
                    speed={45}
                >
                    {fyi.map((text, index) => (
                        <span key={index} className={style.contentFirst__marquee__item}>
                            <span className={style.contentFirst__marquee__item__dot}>❀</span>
                            {text}
                        </span>
                    ))}
                </Marquee>
            :
                <></>
            }
        </div>
        
    )
}