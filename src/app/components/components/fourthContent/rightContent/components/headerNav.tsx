// style
import React from "react";

// template 
import { storyOrder, storyStatus } from "@hwasanchae/app/template/variants"; // ✅ 

// style
import style from "../../../styles/fourthContent/rightContent/componentStyle/HeaderNav.module.scss";

type Props = {
    allGenres: string[]; 
    allLanguage: string[];
    handleOnChangeGenre: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
    handleOnChangeLanguage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleOnChangeStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
    handleOnChangeOrder: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
    searchValue: string; 
    handleOnChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function HeaderNav(
    { 
        allGenres,
        allLanguage,
        handleOnChangeGenre, 
        handleOnChangeLanguage,
        handleOnChangeStatus, 
        handleOnChangeOrder, 
        searchValue, 
        handleOnChangeSearch 
    }: Props
) {
    return (
        <div className={style.headerNav}>
            <div className={style.headerNav__selectionContainer}>
                <select name="genre" id="genre" onChange={(e) => handleOnChangeGenre(e)}>
                    <option value="All Genre">All Genre</option>
                    {allGenres.map((genre, index) => (
                        <option value={genre} key={index}>{genre}</option>
                    ))}
                </select>
                <select name="language" id="language" onChange={(e) => handleOnChangeLanguage(e)}>
                    <option value="All Language">All Language</option>
                    {allLanguage.map((language, index) => (
                        <option value={language} key={index}>{language}</option>
                    ))}
                </select>
                <select name="status" id="status" onChange={(e) => handleOnChangeStatus(e)}>
                    <option value="All Status">All Status</option>
                    {storyStatus.map((status, index) => (
                        <option value={status} key={index}>{status}</option>
                    ))}
                </select>
                <select name="order" id="order" onChange={(e) => handleOnChangeOrder(e)}>
                    {storyOrder.map((order, index) => (
                        <option value={order.order} key={index}>{order.name}</option>
                    ))}
                </select>
            </div>
            <input className={style.headerNav__input} placeholder="Search..." type="text" onChange={(e) => handleOnChangeSearch(e)} value={searchValue} />
        </div>
    )
}