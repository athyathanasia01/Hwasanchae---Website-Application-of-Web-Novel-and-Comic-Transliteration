// components
import LastUpdate from "./components/lastUpdateContent";
import TopPopular from "./components/topPopular";

// template
import { NewStoryDetail } from "@hwasanchae/app/template/story/story"; // ✅ 

// style
import style from "../styles/secondContent/Content.module.scss";

type Props = {
    story: Omit<NewStoryDetail, 'isBookmark'>[];
}

export default function SecondContent({ story }: Props) {
    return (
        <div className={style.contentSecond}>
            <TopPopular story={story} />
            <LastUpdate story={story} />
        </div>
    )
}