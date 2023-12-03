import React, {FC, useEffect} from 'react';
import Movie from "../Movie/Movie";
import css from './movies.module.css'
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {movieActions} from "../../../redux/slices/moviesSlice";

interface IProps {
    page:string
}

const Movies:FC<IProps> = ({page}) => {

    const dispatch = useAppDispatch();
    const {results, genreResults, nameResults} = useAppSelector(state => state.movies);

    const {id, tag} = useParams();

    useEffect(() => {
        dispatch(movieActions.getAll(page))
    }, [page,dispatch])

    useEffect(() => {
        dispatch(movieActions.findById({id,page}))

    }, [page, id,dispatch]);
    useEffect(() => {
        dispatch(movieActions.findByName({tag,page}))
    },[page,tag,dispatch]);

    if (!results || !genreResults){
        return <div>Loading...</div>
    }

    if (tag){
        return (
            <div>
                <div id={css.Movies}>
                    {nameResults.map(movie => <Movie movie={movie} key={movie.id}/>)}
                </div>
            </div>
        )
    }

    if (id) {
        return (
        <div>
            <div id={css.Movies}>
                {genreResults.map(movie => <Movie movie={movie} key={movie.id}/>)}
            </div>
        </div>
        )
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