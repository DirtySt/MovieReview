import React from 'react';
import GenreMovies from "../../components/GenreContainer/GenreMovies/GenreMovies";
import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/ReduxHooks";

const GenreMoviesPage = () => {

    const {error} = useAppSelector(state => state.movies);

    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page');

    const prev = () => {
        setQuery(prev => {
            prev.set('page', `${+page - 1}`);
            return prev;
        })
    }

    const next = () => {
        setQuery(prev => {
            prev.set('page', `${+page + 1}`);
            return prev;
        })
    }

    return (
        <div>
            {error ? <div>{error.message}</div> : <GenreMovies page={page}/>}
            <div>
                <button disabled={page === '1' && true} onClick={prev}>prev</button>
                <button disabled={page === '499'} onClick={next}>next</button>
            </div>
        </div>
    );
};

export default GenreMoviesPage;