import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/Header/Header";
import css from './MainLayout.module.css'
import {useAppSelector} from "../hooks/ReduxHooks";

const MainLayout = () => {

    const {darkTheme} = useAppSelector(state => state.movies)

    const layout = document.getElementsByClassName(css.Layout);
    const page = document.getElementsByClassName(css.page);

    useEffect(()=>{
        if (darkTheme){
            layout.item(0).classList.add(css.Dark)
            page.item(0).classList.add(css.DarkPage)
        }
        else {
            if (layout.item(0).classList !== null || page.item(0).classList !== null){
                layout.item(0).classList.remove(css.Dark)
                page.item(0).classList.remove(css.DarkPage)
            }
        }
    },[darkTheme,layout,page])


    return (
        <div>
            <Header/>
            <div className={css.Layout}>
                <div className={css.page}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;