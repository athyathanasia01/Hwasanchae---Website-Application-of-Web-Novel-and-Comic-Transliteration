import style from "../../styles/bottomContent/componentStyle/FootnoteContent.module.scss";

type Props = {
    idFootnote: number;
    handleDeleteFootnote: (id: number) => void;
    valuePhrase: string;
    handleChangePhrase: (value: string) => void;
    valueMeaning: string;
    handleChangeMeaning: (value: string) => void;
}

export default function FootnoteContent(
    { 
        idFootnote, 
        handleDeleteFootnote, 
        valuePhrase, 
        handleChangePhrase, 
        valueMeaning, 
        handleChangeMeaning 
    }: Props
) {
    return (
        <div className={style.footnoteContent}>
            <div className={style.footnoteContent__idContainer}>
                <span className={style.footnoteContent__idContainer__idTitle}>ID: {idFootnote}</span>
                <svg className={style.footnoteContent__idContainer__iconDelete} onClick={() => handleDeleteFootnote(idFootnote)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" id="Bin-1--Streamline-Ultimate" height="18" width="18">
                    <desc>
                        Bin 1 Streamline Icon: https://streamlinehq.com
                    </desc>
                    <g id="Bin-1--Streamline-Ultimate.svg">
                        <path d="M14.587499999999999 5.625H3.4124999999999996a0.375 0.375 0 0 0 -0.375 0.405l0.96 10.605a1.5 1.5 0 0 0 1.5 1.365h7.005a1.5 1.5 0 0 0 1.5 -1.365L15 6a0.375 0.375 0 0 0 -0.375 -0.405Zm-6.8999999999999995 9.75a0.5625 0.5625 0 0 1 -1.125 0v-6.75a0.5625 0.5625 0 0 1 1.125 0Zm3.75 0a0.5625 0.5625 0 0 1 -1.125 0v-6.75a0.5625 0.5625 0 0 1 1.125 0Z" fill="#e60202" strokeWidth="0.75"></path>
                        <path d="M16.5 3h-3.5625a0.1875 0.1875 0 0 1 -0.1875 -0.1875V1.875A1.875 1.875 0 0 0 10.875 0h-3.75A1.875 1.875 0 0 0 5.25 1.875v0.9375a0.1875 0.1875 0 0 1 -0.1875 0.1875H1.5a0.75 0.75 0 0 0 0 1.5h15a0.75 0.75 0 0 0 0 -1.5ZM6.75 2.8125V1.875a0.375 0.375 0 0 1 0.375 -0.375h3.75a0.375 0.375 0 0 1 0.375 0.375v0.9375a0.1875 0.1875 0 0 1 -0.1875 0.1875h-4.125A0.1875 0.1875 0 0 1 6.75 2.8125Z" fill="#e60202" strokeWidth="0.75"></path>
                    </g>
                </svg>
            </div>
            <div className={style.footnoteContent__inputArea}>
                <input 
                    className={style.footnoteContent__inputArea__inputPhrase} 
                    type="text" value={valuePhrase} 
                    onChange={(e) => handleChangePhrase(e.target.value)} 
                    placeholder="Phrase" 
                />
                <textarea 
                    className={style.footnoteContent__inputArea__inputMeaning} 
                    value={valueMeaning} 
                    onChange={(e) => handleChangeMeaning(e.target.value)} 
                    placeholder="Meaning..." 
                />
            </div>
        </div>
    )
}