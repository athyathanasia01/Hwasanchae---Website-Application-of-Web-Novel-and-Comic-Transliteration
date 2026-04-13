"use client";

// technical
import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation";

// components
import GroupPhrase from "./groupPhrase";

// template
import { GlosariumList } from "@hwasanchae/app/template/story/footnote"; // ✅ 

// style
import style from "./styles/Content.module.scss";

type Props = {
    title: string;
    glosarium: GlosariumList[];
}

export default function Content({ title, glosarium }: Props) {
    const [filteredGlosarium, setFilteredGlosarium] = useState<GlosariumList[]>(glosarium);
    const [searchValue, setSearchValue] = useState<string>("");

    const router = useRouter();

    function handleOnChangeSearchValue(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setSearchValue(value);

        if (value.trim() === "") {
            setFilteredGlosarium(glosarium);
            return;
        }

        const keyword = value.toLowerCase();

        const filtered = glosarium.map(group => {
            const matchedPhraseData = group.footnote.filter(item => 
                item.phrase.toLowerCase().includes(keyword)
            );
            const matchedMeaningData = group.footnote.filter(item => 
                item.meaning.toLowerCase().includes(keyword)
            );

            return {
                alphaNum: group.alphaNum,
                footnote: [...matchedPhraseData, ...matchedMeaningData]
            };
        }).filter(group => group.footnote.length > 0);

        setFilteredGlosarium(filtered);
    }

    function handleBack() {
        router.back();
    }

    return (
        <div className={style.contentGlosarium}>
            <p className={style.contentGlosarium__title}>Glosarium</p>
            <div className={style.contentGlosarium__searchNav}>
                <span className={style.contentGlosarium__searchNav__title} onClick={handleBack}>{title}</span>
                <div className={style.searchWrapper}>
                    <input 
                        className={style.searchInput}
                        type="text" 
                        value={searchValue} 
                        onChange={handleOnChangeSearchValue} 
                        placeholder="Search..."
                    />
                    <Search className={style.searchIcon} size={18} />
                </div>
            </div>
            <ul className={style.contentGlosarium__unorderList}>
                {filteredGlosarium.map((glosarium) => (
                    <GroupPhrase
                        key={glosarium.alphaNum}
                        groupAlpha={glosarium.alphaNum} 
                        listPhrase={glosarium.footnote} 
                    />
                ))}
            </ul>
        </div>
    )
}