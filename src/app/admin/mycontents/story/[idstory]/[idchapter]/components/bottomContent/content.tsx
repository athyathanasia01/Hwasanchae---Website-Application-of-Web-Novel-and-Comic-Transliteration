// technical 
import { Editor } from "@tiptap/core";
import { SimpleEditor } from "@hwasanchae/components/tiptap-templates/simple/simple-editor";

// template
import { FootnoteInput } from "@hwasanchae/app/template/story/footnote"; // ✅ 

// components
import FootnotePage from "./components/footnoteContainer";

// style
import style from "../styles/bottomContent/Content.module.scss";

type Props = {
    editor: Editor | null;
    addFootnote: () => void;
    removeFootnote: (id: number) => void;
    updateFootnote: (id: number, field: "phrase" | "meaning", e: any) => void;
    footnotes: FootnoteInput[];
    loadingState: boolean;
}

export default function BottomContent(
    { 
        editor, 
        addFootnote, 
        removeFootnote, 
        updateFootnote, 
        footnotes,
        loadingState
    }: Props
) {
    return loadingState ?
        <div className={style.bottomContentLoad}>
            <div className={style.bottomContentLoad__textEditor}></div>
            <div className={style.bottomContentLoad__footnote}></div>
        </div>
    :
        <div className={style.bottomContent}>
            <SimpleEditor editor={editor} user="writer" />
            <FootnotePage addFootnote={addFootnote} removeFootnote={removeFootnote} updateFootnote={updateFootnote} footnotes={footnotes} />
        </div>
}