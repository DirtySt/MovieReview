import React, {useContext, useEffect} from 'react';
import css from './Header.module.css'
import {NavLink} from "react-router-dom";
import MovieSearchForm from "../MovieSearchForm/MovieSearchForm";
import {Context} from "../../hoc/ContextProvider";

const Header = () => {

    let el = document.getElementsByClassName(css.Header);

    const {setDarkTheme,darkTheme} = useContext(Context)
    console.log(darkTheme)

    useEffect(()=>{
        if (darkTheme){
            el.item(0).classList.add(css.Dark)
        }
        else {
            el.item(0).classList.remove(css.Dark)
        }
    },[darkTheme,el])



    return (
        <div className={css.Header}>
            <input type={"checkbox"} onClick={()=>{setDarkTheme(prevState => !prevState)}}/>
            <NavLink to={'movies'}>Movies</NavLink>
            <NavLink to={'genres'}>Genres</NavLink>
            <MovieSearchForm/>
            <div className={css.user}>
                <div>user</div>
            </div>
        </div>
    );
};

export default Header;