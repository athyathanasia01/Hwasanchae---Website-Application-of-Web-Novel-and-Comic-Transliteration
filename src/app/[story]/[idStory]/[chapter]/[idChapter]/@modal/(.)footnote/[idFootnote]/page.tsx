// components
import Content from "../components/content";

// template
import { MyChapter } from "@hwasanchae/app/template/story/chapter"; // ✅ 

// dynamic modal
import dynamic from "next/dynamic";
const Modal = dynamic(() => import(`@hwasanchae/components/core/modal`));

type PageProps = {
    params: Promise<{
        idChapter: string;
        idFootnote: string;
    }>
}

async function getFootnoteData(idChapter: string, idFootnote: number) {
    try {
        const baseUrl = process.env.BASE_URL!;
        const response = await fetch(`${baseUrl}/api/chapter?idChapter=${idChapter}`, {
            next: { tags: [`chapter`, `chapter:${idChapter}`] }
        });
        const responseData = await response.json();
        const data = responseData.data as MyChapter;

        const footnoteList = data.footnotes;
        const footnote = footnoteList[idFootnote - 1];

        return footnote;
    } catch (error) {
        console.log(`Error get footnote data: ${error}`);

        return null;
    }
}

export default async function Page({ params }: PageProps) {
    const { idChapter, idFootnote } = await params;
    const footnoteData = await getFootnoteData(idChapter, Number(idFootnote));

    return (
        <Modal>
            <Content footnote={footnoteData} /> 
        </Modal>
    )
}