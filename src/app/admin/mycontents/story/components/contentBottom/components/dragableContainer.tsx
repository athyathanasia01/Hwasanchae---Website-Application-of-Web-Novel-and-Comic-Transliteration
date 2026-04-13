// technical
import { useRouter } from "next/navigation";
import { closestCenter, DndContext } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

// template
import { ChapterData } from "@hwasanchae/app/template/story/chapter"; // ✅ 

// components
import { DragableItem } from "./dragableContent";

// style
import style from "../../styles/contentBottom/componentStyle/DragableContainer.module.scss";

type Props = {
    storyId: string | null | undefined;
    chapters: ChapterData[];
    handleDragEnd: (e: any) => void;
    addNewChapter: () => void;
    loadingState: boolean;
}

export default function DragableContainer(
    { 
        storyId, 
        chapters, 
        handleDragEnd, 
        addNewChapter,
        loadingState
    }: Props
) {
    const { push } = useRouter();

    function handleGoToDetail(id: string) {
        push(`/admin/mycontents/story/${storyId}/${id}`);
    }
    
    return (
        <div className={style.dragableContent}>
            <div className={style.dragableContent__top}>
                {loadingState ?
                        <div className={style.dragableContent__top__titleLoad}></div>
                    :
                        <>
                            <span className={style.dragableContent__top__title}>Chapter List</span>
                            <svg className={`${style.dragableContent__top__icon} ${style[`dragableContent__top__icon--${loadingState ? 'disable' : 'able'}`]}`} onClick={addNewChapter} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" id="Add-Circle--Streamline-Core" height="16" width="16">
                                <desc>
                                    Add Circle Streamline Icon: https://streamlinehq.com
                                </desc>
                                <g id="add-circle--button-remove-cross-add-buttons-plus-circle-+-mathematics-math">
                                    <path id="Subtract" fill="#ffffff" fillRule="evenodd" d="M16 8c0 4.418285714285714 -3.5817142857142854 8 -8 8 -4.418274285714285 0 -8 -3.5817142857142854 -8 -8 0 -4.418274285714285 3.581725714285714 -8 8 -8 4.418285714285714 0 8 3.581725714285714 8 8ZM8 3.714285714285714c0.47338285714285716 0 0.8571428571428571 0.38375999999999993 0.8571428571428571 0.8571428571428571v2.571428571428571H11.428571428571427c0.47337142857142855 0 0.8571428571428571 0.38375999999999993 0.8571428571428571 0.8571428571428571s-0.38377142857142854 0.8571428571428571 -0.8571428571428571 0.8571428571428571H8.857142857142856V11.428571428571427c0 0.47337142857142855 -0.38375999999999993 0.8571428571428571 -0.8571428571428571 0.8571428571428571s-0.8571428571428571 -0.38377142857142854 -0.8571428571428571 -0.8571428571428571V8.857142857142856H4.571428571428571c-0.47338285714285716 0 -0.8571428571428571 -0.38375999999999993 -0.8571428571428571 -0.8571428571428571s0.38375999999999993 -0.8571428571428571 0.8571428571428571 -0.8571428571428571h2.571428571428571V4.571428571428571c0 -0.47338285714285716 0.38375999999999993 -0.8571428571428571 0.8571428571428571 -0.8571428571428571Z" clipRule="evenodd" strokeWidth="1.1429"></path>
                                </g>
                            </svg>
                        </>
                }
            </div>
            <div className={style.dragableContent__content}>
                {loadingState ?
                        <ul className={style.dragableContent__content__loadList}>
                            {Array.from({ length: 7 }).map((_, index) => (
                                <div className={style.dragableContent__content__loadList__list} key={index}></div>
                            ))}
                        </ul>
                    :
                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={chapters.map(c => c.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {chapters.map((chapter) => (
                                    <DragableItem 
                                        key={chapter.id}
                                        id={chapter.id}
                                        title={chapter.title}
                                        like={chapter.vote}
                                        read={chapter.read}
                                        status={chapter.status}
                                        onClick={() => handleGoToDetail(chapter.id)}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                }
            </div>
        </div>
    )
}