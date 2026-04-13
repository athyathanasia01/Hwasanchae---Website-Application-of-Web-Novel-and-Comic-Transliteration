// template
import { NewStoryDetail } from "@hwasanchae/app/template/story/story"; // ✅ 

// components
import BottomContent from "./components/bottomContent";
import MiddleContent from "./components/middleContent";
import TopContent from "./components/topContent";

// style 
import style from "../../styles/firstContent/rightContent/Content.module.scss";

type Props = {
    data: NewStoryDetail;
}

export default function RightContent({ data }: Props) {
    return (
        <div className={style.rightContent}>
            <TopContent 
                status={data.status} 
                title={data.title} 
                like={data.vote ? data.vote : 0} 
            />
            <MiddleContent 
                nativeLang={data.nativeLanguage} 
                transLang={data.translatedLanguage} 
                author={data.writer} 
                type={data.type} 
                firstRelease={data.firstRelease} 
                seen={data.read ? data.read : 0} 
            />
            <BottomContent 
                allTags={data.tags} 
            />
        </div>
    )
}