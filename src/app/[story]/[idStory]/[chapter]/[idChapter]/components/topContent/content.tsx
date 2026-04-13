// template
import { MyStory } from "@hwasanchae/app/template/story/story";
import { MyChapter } from "@hwasanchae/app/template/story/chapter";

// components
import DetailDescription from "./components/detailDesc";
import TitleDescription from "./components/titleDesc";

// style
import style from "../styles/topContent/Content.module.scss";

type Props = {
    story: MyStory;
    chapter: MyChapter;
}

export default function TopContent({ story, chapter }: Props) {
    return (
        <div className={style.topContent}>
            <TitleDescription 
                title={story.title} 
                chapter={chapter.title} 
            />
            <DetailDescription 
                story={story} 
                chapter={chapter} 
            />
        </div>
    )
}