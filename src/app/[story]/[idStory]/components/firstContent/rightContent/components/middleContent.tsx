// components
import DataContainer from "./dataContainer";

// style
import style from "../../../styles/firstContent/rightContent/componentStyle/MiddleContent.module.scss";

type Props = {
    nativeLang: string;
    transLang: string;
    author: string;
    type: string;
    firstRelease: string;
    seen: number;
}

export default function MiddleContent(
    {
        nativeLang,
        transLang,
        author,
        type,
        firstRelease,
        seen
    }: Props
) {
    return (
        <div className={style.middleContent}>
            <DataContainer title="Native Language" data={nativeLang} />
            <DataContainer title="Translation Language" data={transLang} />
            <DataContainer title="Author" data={author} />
            <DataContainer title="Type" data={type} />
            <DataContainer title="First Release" data={firstRelease} />
            <DataContainer title="Total Viewers" data={seen} />
        </div>
    )
}