import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {movieActions} from "../../../redux/slices/moviesSlice";
import Genre from "../Genre/Genre";
import css from './Genres.module.css'

const Genres = () => {

    const dispatch = useAppDispatch();
    const {genres} = useAppSelector(state => state.movies)

    useEffect(()=>{
        dispatch(movieActions.getGenres());
    })

    return (
        <div className={css.Container}>
            {genres.map(genre => <Genre genre={genre} key={genre.id}/>)}
        </div>
    );
};

export default Genres;