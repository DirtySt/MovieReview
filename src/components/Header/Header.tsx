import React, {useEffect} from 'react';
import css from './Header.module.css'
import {NavLink} from "react-router-dom";
import MovieSearchForm from "../MovieSearchForm/MovieSearchForm";
import {useAppDispatch, useAppSelector} from "../../hooks/ReduxHooks";
import {movieActions} from "../../redux/slices/moviesSlice";

const Header = () => {

    let el = document.getElementsByClassName(css.Header);

    const {darkTheme} = useAppSelector(state => state.movies)
    const dispatch = useAppDispatch();

    const changeTheme = () => {
        dispatch(movieActions.darkThemeChanger());
    };

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
            <input type={"checkbox"} onClick={changeTheme}/>
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