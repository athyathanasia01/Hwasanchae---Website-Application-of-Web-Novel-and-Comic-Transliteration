// technical
import { SimpleEditor } from "@hwasanchae/components/tiptap-templates/simple/simple-editor";
import { Editor } from "@tiptap/core";
import { useState } from "react";

type Props = {
    editor: Editor | null;
}

export default function LeftContent({ editor }: Props) {
    const [myFont, setMyFont] = useState<string>('inter');

    function handleOnChangeFont(e: any) {
        setMyFont(e.target.value);
    }

    return <SimpleEditor editor={editor} user="reader" myFont={myFont} handleOnChangeFont={handleOnChangeFont}/>
}