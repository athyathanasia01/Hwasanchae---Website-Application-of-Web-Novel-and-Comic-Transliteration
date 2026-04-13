// components
import ButtonSubmit from "./components/buttonSubmit";
import TitleInput from "./components/titleInput";

// style
import style from "../styles/topContent/Content.module.scss";

type Props = {
    title: string | null;
    handleOnChangeTitle: (e: any) => void;
    saveDraftClicked: () => void;
    saveUpdateClicked: () => void;
    deleteChapterClicked: () => void;
    handleBackButton: () => void;
    loadingState: boolean;
}

export default function TopContent(
    {
        title, 
        handleOnChangeTitle, 
        saveDraftClicked, 
        saveUpdateClicked, 
        deleteChapterClicked, 
        handleBackButton,
        loadingState
    }: Props
) { 
    return loadingState ?
        <div className={style.topContentLoad}></div>
    :
        <div className={style.topContent}>
            <button 
                name="back"
                className={style.topContent__buttonBack}
                onClick={handleBackButton}
            >
                Back
            </button>
            <TitleInput value={title} setValue={handleOnChangeTitle} />
            <div className={style.topContent__buttonContainer}>
                <button 
                    name="delete" 
                    className={style.topContent__buttonContainer__btnDelete} 
                    onClick={deleteChapterClicked}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" id="Bin-1--Streamline-Ultimate" height="18" width="18">
                        <desc>
                            Bin 1 Streamline Icon: https://streamlinehq.com
                        </desc>
                        <g id="Bin-1--Streamline-Ultimate.svg">
                            <path d="M14.587499999999999 5.625H3.4124999999999996a0.375 0.375 0 0 0 -0.375 0.405l0.96 10.605a1.5 1.5 0 0 0 1.5 1.365h7.005a1.5 1.5 0 0 0 1.5 -1.365L15 6a0.375 0.375 0 0 0 -0.375 -0.405Zm-6.8999999999999995 9.75a0.5625 0.5625 0 0 1 -1.125 0v-6.75a0.5625 0.5625 0 0 1 1.125 0Zm3.75 0a0.5625 0.5625 0 0 1 -1.125 0v-6.75a0.5625 0.5625 0 0 1 1.125 0Z" fill="currentColor" strokeWidth="0.75"></path>
                            <path d="M16.5 3h-3.5625a0.1875 0.1875 0 0 1 -0.1875 -0.1875V1.875A1.875 1.875 0 0 0 10.875 0h-3.75A1.875 1.875 0 0 0 5.25 1.875v0.9375a0.1875 0.1875 0 0 1 -0.1875 0.1875H1.5a0.75 0.75 0 0 0 0 1.5h15a0.75 0.75 0 0 0 0 -1.5ZM6.75 2.8125V1.875a0.375 0.375 0 0 1 0.375 -0.375h3.75a0.375 0.375 0 0 1 0.375 0.375v0.9375a0.1875 0.1875 0 0 1 -0.1875 0.1875h-4.125A0.1875 0.1875 0 0 1 6.75 2.8125Z" fill="currentColor" strokeWidth="0.75"></path>
                        </g>
                    </svg>
                    Delete Chapter
                </button>
                <ButtonSubmit name="Save as Draft" color="black" onClick={saveDraftClicked} />
                <ButtonSubmit name="Save and Update" color="pink" onClick={saveUpdateClicked} />
            </div>
        </div>
}