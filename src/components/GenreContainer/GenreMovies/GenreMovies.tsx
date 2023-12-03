import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {movieActions} from "../../../redux/slices/moviesSlice";
import {useParams} from "react-router-dom";
import Movie from "../../MovieContainer/Movie/Movie";
import css from '../../MovieContainer/Movies/movies.module.css';
import {IPageProps} from "../../../interfaces/IPageProps";

const GenreMovies:FC<IPageProps> = ({page}) => {

    const dispatch = useAppDispatch();
    const {genreResults, error} = useAppSelector(state => state.movies);

    const {id} = useParams();

    useEffect(()=>{
        dispatch(movieActions.findById({id,page}))
    },[page,dispatch,id])

    if (!genreResults){
        return <div>Loading...</div>
    }

    return (
        <div id={css.Movies}>
            {error ? <div>{error.message}</div> : genreResults.map(movie => <Movie movie={movie} key={movie.id}/>)}
        </div>
    );
};

export default GenreMovies;