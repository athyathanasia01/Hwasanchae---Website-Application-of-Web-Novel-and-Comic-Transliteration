// technical
import { THEME_OPTIONS } from "@hwasanchae/app/template/variants";
import { SimpleEditor, Theme } from "@hwasanchae/components/tiptap-templates/simple/simple-editor";
import { Editor } from "@tiptap/core";
import { useState } from "react";

type Props = {
    editor: Editor | null;
}

export default function LeftContent({ editor }: Props) {
    const [myFont, setMyFont] = useState<string>('inter');
    const [myTheme, setMyTheme] = useState<Theme>(THEME_OPTIONS[2]);

    function handleOnChangeFont(e: any) {
        setMyFont(e.target.value);
    }

    function handleOnChangeTheme(e: any) {
        const selectedTheme = THEME_OPTIONS.find((theme) => theme.label === e.target.value) ?? THEME_OPTIONS[2];
        setMyTheme(selectedTheme);
    }

    return <SimpleEditor 
        editor={editor} 
        user="reader" 
        myFont={myFont} 
        theme={myTheme}
        handleOnChangeFont={handleOnChangeFont}
        handleOnChangeTheme={handleOnChangeTheme}
    />
}