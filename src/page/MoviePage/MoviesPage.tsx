import React from 'react';
import Movies from "../../components/MovieContainer/Movies/Movies";
import {useAppSelector} from "../../hooks/ReduxHooks";

const MoviesPage = () => {

    const {error} = useAppSelector(state => state.movies);

    return (
        <div>
            {error ? <div>{error.message}</div> : <Movies/>}
        </div>
    );
};

export default MoviesPage;