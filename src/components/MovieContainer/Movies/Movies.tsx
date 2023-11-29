import React, {useEffect} from 'react';
import Movie from "../Movie/Movie";
import css from './movies.module.css'
import {useParams, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/ReduxHooks";
import {movieActions} from "../../../redux/slices/moviesSlice";


const Movies = () => {

    const dispatch = useAppDispatch();
    const {results,genreResults,nameResults} = useAppSelector(state => state.movies)

    const {id,tag} = useParams()

    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page');

    console.log(tag)

    useEffect(() => {
        dispatch(movieActions.getAll(page))
    }, [page,dispatch])

    useEffect(() => {
        dispatch(movieActions.findById({id,page}))

    }, [page, id,dispatch]);
    useEffect(() => {
        dispatch(movieActions.findByName({tag,page}))
    },[page,tag,dispatch]);

    const prev = () => {
        setQuery(prev => {
            prev.set('page', `${+page - 1}`)
            return prev
        })
    }

    const next = () => {
        setQuery(prev => {
            prev.set('page', `${+page + 1}`)
            return prev
        })
    }

    if (!results){
        return <div>Loading...</div>
    }

    if (tag){
        return (
            <div>
                <div id={css.Movies}>
                    {nameResults.map(movie => <Movie movie={movie} key={movie.id}/>)}
                </div>
                <div>
                    <button disabled={page === '1' && true} onClick={prev}>prev</button>
                    <button disabled={page === '499'} onClick={next}>next</button>
                </div>
            </div>
        )
    }

    if (!genreResults){
        return <div>Loading...</div>
    }

    if (id) {
        return (
        <div>
            <div id={css.Movies}>
                {genreResults.map(movie => <Movie movie={movie} key={movie.id}/>)}
            </div>
            <div>
                <button disabled={page === '1' && true} onClick={prev}>prev</button>
                <button disabled={page === '499'} onClick={next}>next</button>
            </div>
        </div>
        )
    }
    console.log(results)

    return (
        <div>
            <div id={css.Movies}>
                {results.map(movie => <Movie movie={movie} key={movie.id}/>)}
            </div>
            <div>
                <button disabled={page === '1' && true} onClick={prev}>prev</button>
                <button disabled={page === '499'} onClick={next}>next</button>
            </div>
        </div>
    );
};

export default Movies;