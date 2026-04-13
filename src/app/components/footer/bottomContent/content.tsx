// style
import style from "../../styles/footer/bottomContent/Content.module.scss";

type Props = {
    webCopyright: string;
    devCopyright: string;
}

export default function BottomContent({ webCopyright, devCopyright }: Props) {
    return (
        <div className={style.bottomContent}>
            <span className={style.bottomContent__topTitle}>Copyright {'\u00A9'} {new Date().getFullYear()} {webCopyright} and {devCopyright}. All Right Reserved</span>
            <span className={style.bottomContent__bottomTitle}>version: 1.0.0</span>
        </div>
    )
}