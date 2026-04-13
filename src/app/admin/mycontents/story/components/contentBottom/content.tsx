// template
import { ChapterData } from "@hwasanchae/app/template/story/chapter"; // ✅ 

// components
import DragableContainer from "./components/dragableContainer";
import InputTextArea from "./components/inputTextAreaContainer";

// style
import style from "../styles/contentBottom/Content.module.scss";

type Props = {
    idStory: string | null | undefined;
    summary: string | null | undefined;
    setSummary: (e: any) => void;
    chapters: ChapterData[];
    handleDragEnd: (e: any) => void;
    addNewChapter: () => void;
    loadingState: boolean;
}

export default function ContentBottom(
    { 
        idStory, 
        summary, 
        setSummary, 
        chapters, 
        handleDragEnd, 
        addNewChapter,
        loadingState
    }: Props
) {
    return (
        <div className={style.contentBottom}>
            <InputTextArea 
                value={summary} 
                setValue={setSummary} 
                loadingState={loadingState}
            />
            <DragableContainer 
                storyId={idStory} 
                chapters={chapters} 
                handleDragEnd={handleDragEnd} 
                addNewChapter={addNewChapter} 
                loadingState={loadingState}
            />
        </div>
    )
}