import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {useParams} from "react-router-dom";
import {movieActions} from "../../../redux/slices/moviesSlice";
import Movie from "../../MovieContainer/Movie/Movie";
import css from '../../MovieContainer/Movies/movies.module.css';
import {IPageProps} from "../../../interfaces/IPageProps";

const SearchMovies:FC<IPageProps> = ({page}) => {

    const dispatch = useAppDispatch();
    const {nameResults, error} = useAppSelector(state => state.movies);

    const {tag} = useParams();

    useEffect(() => {
        dispatch(movieActions.findByName({tag, page}));
    }, [tag, page, dispatch]);

    if (!nameResults){
        return <div>Loading...</div>
    }

    return (
        <div id={css.Movies}>
            {error ? <div>{error.message}</div> : nameResults.map(movie => <Movie movie={movie} key={movie.id}/>)}
        </div>
    );
};

export default SearchMovies;