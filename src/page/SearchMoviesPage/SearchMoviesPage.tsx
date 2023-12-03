import React from 'react';
import SearchMovies from "../../components/SearchMovies/SearchMovies/SearchMovies";
import {useAppSelector} from "../../hooks/ReduxHooks";
import {useSearchParams} from "react-router-dom";

const SearchMoviesPage = () => {

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
            {error ? <div>{error.message}</div> : <SearchMovies page={page}/>}
            <div>
                <button disabled={page === '1' && true} onClick={prev}>prev</button>
                <button disabled={page === '499'} onClick={next}>next</button>
            </div>
        </div>
    );
};

export default SearchMoviesPage;