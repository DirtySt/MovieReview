import React from 'react';
import Movies from "../../components/MovieContainer/Movies/Movies";
import {useAppSelector} from "../../hooks/ReduxHooks";
import {useSearchParams} from "react-router-dom";

const MoviesPage = () => {

    const {error} = useAppSelector(state => state.movies);

    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page');

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

    return (
        <div>
            {error ? <div>{error.message}</div> : <Movies page={page}/>}
            <div>
                <button disabled={page === '1' && true} onClick={prev}>prev</button>
                <button disabled={page === '499'} onClick={next}>next</button>
            </div>
        </div>
    );
};

export default MoviesPage;