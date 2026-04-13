// template
import { NewChapterItem } from "@hwasanchae/app/template/story/chapter"; // ✅ 

// components
import ListContainer from "./components/listContainer";

// style 
import style from "../../styles/thirdContent/leftContent/Content.module.scss";

type Props = {
    chapterList: NewChapterItem[];
    handleOnClickChapter: (idChapter: string, chapterTitle: string) => void;
}

export default function LeftContent({ chapterList, handleOnClickChapter }: Props) {
    return (
        <div className={style.leftContent}>
            <div className={style.leftContent__navigationTop}>
                <span className={style.leftContent__navigationTop__title}>Reading List</span>
            </div>
            <div className={style.leftContent__tableContainer}>
                <ListContainer 
                    chapterList={chapterList} 
                    handleOnClickChapter={(idChapter: string, chapterTitle: string) => handleOnClickChapter(idChapter, chapterTitle)}
                />
            </div>
        </div>
    )
}