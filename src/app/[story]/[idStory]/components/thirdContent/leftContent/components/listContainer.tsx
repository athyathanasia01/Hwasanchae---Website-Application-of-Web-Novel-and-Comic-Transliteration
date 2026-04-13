// helper
import { formatDateToString } from "@hwasanchae/app/template/serverHelper"; // ✅ 

// template
import { NewChapterItem } from "@hwasanchae/app/template/story/chapter"; // ✅ 

// style
import style from "../../../styles/thirdContent/leftContent/componentStyle/ListContainer.module.scss";

type Props = {
    handleOnClickChapter: (idChapter: string, chapterTitle: string) => void;
    chapterList: NewChapterItem[];
}

export default function ListContainer(
    {
        handleOnClickChapter,
        chapterList
    }: Props
) {
    return (
        <table className={style.listContainer}>
            <thead>
                <tr>
                    <th className={style.listContainer__head}>Title</th>
                    <th className={style.listContainer__head}>Published Date</th>
                </tr>
            </thead>
            <tbody className={style.listContainer__body}>
                {chapterList.map((chapter) => (
                    <tr key={chapter.id} onClick={() => handleOnClickChapter(chapter.id, chapter.title)} className={style.listContainer__body__track}>
                        <td className={style.listContainer__body__track__data}>{chapter.title}</td>
                        <td className={style.listContainer__body__track__data}>{formatDateToString(chapter.updatedAt)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}