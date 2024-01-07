import React, {FC, useEffect} from 'react';
import Movie from "../Movie/Movie";
import css from './movies.module.css'
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {movieActions} from "../../../redux/slices/moviesSlice";
import {IPageProps} from "../../../interfaces/IPageProps";

const Movies:FC<IPageProps> = ({page}) => {

    const dispatch = useAppDispatch();
    const {results} = useAppSelector(state => state.movies);

    useEffect(() => {
        dispatch(movieActions.getAll(page))
    }, [page,dispatch])

    console.log(results)

    if (!results){
        return <div>Loading...</div>
    }

    return (
        <div>
            <div id={css.Movies}>
                {results.map(movie => <Movie movie={movie} key={movie.id}/>)}
            </div>
        </div>
    );
};

export default Movies;