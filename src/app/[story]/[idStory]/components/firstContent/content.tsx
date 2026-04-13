// template
import { NewStoryDetail } from "@hwasanchae/app/template/story/story";

// components
import LeftContent from "./leftContent/content";
import RightContent from "./rightContent/content";

// style 
import style from "../styles/firstContent/Content.module.scss";

type Props = {
    data: NewStoryDetail;
}

export default function FirstContent({ data }: Props) {
    return (
        <div className={style.firstContent}>
            <LeftContent image={data.coverImage ? data.coverImage.url : '/image/image_cover.jpg'} title={data.title} />
            <RightContent data={data} />
        </div>
    )
}