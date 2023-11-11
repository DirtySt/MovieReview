import React, {useEffect, useState} from 'react';
import Movie from "../Movie/Movie";
import {IMovies} from "../../../interfaces/IMovies";
import css from './movies.module.css'
import {movieService} from "../../../services/movieService";
import {useParams, useSearchParams} from "react-router-dom";
import {genresService} from "../../../services/genresService";


const Movies = () => {

    const {id,tag} = useParams()

    const [movies, setMovies] = useState<IMovies>({page: null, results: [], total_pages: null, total_results: null});
    const [searchMovies,setSearchMovies] = useState<IMovies>({page: null, results: [], total_pages: null, total_results: null})
    const [genreMovies, setGenreMovies] = useState<IMovies>({
        page: null,
        results: [],
        total_pages: null,
        total_results: null
    })


    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page');

    console.log(tag)

    useEffect(() => {
        movieService.getAll(page.toString()).then(({data: {page, results, total_results, total_pages}}) =>
            setMovies({page, results, total_results, total_pages}));
    }, [page])

    useEffect(() => {
        genresService.findById(id, page.toString()).then(({data: {page, results, total_results, total_pages}}) =>
            setGenreMovies({page, results, total_pages, total_results}));
    }, [page, id]);
    useEffect(() => {
        movieService.searchByName(tag,page.toString()).then(({data: {page, results, total_results, total_pages}}) =>
            setSearchMovies({page, results, total_pages, total_results}));
    },[page,tag]);

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

    if (!movies){
        return <div>Loading...</div>
    }

    if (tag){
        return (
            <div>
                <div id={css.Movies}>
                    {searchMovies.results.map(movie => <Movie movie={movie} key={movie.id}/>)}
                </div>
                <div>
                    <button disabled={page === '1' && true} onClick={prev}>prev</button>
                    <button disabled={page === '499'} onClick={next}>next</button>
                </div>
            </div>
        )
    }

    if (id) {
        return (
        <div>
            <div id={css.Movies}>
                {genreMovies.results.map(movie => <Movie movie={movie} key={movie.id}/>)}
            </div>
            <div>
                <button disabled={page === '1' && true} onClick={prev}>prev</button>
                <button disabled={page === '499'} onClick={next}>next</button>
            </div>
        </div>
        )
    }

    return (
        <div>
            <div id={css.Movies}>
                {movies.results.map(movie => <Movie movie={movie} key={movie.id}/>)}
            </div>
            <div>
                <button disabled={page === '1' && true} onClick={prev}>prev</button>
                <button disabled={page === '499'} onClick={next}>next</button>
            </div>
        </div>
    );
};

export default Movies;