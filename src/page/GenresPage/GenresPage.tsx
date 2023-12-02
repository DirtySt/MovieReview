import React from 'react';
import Genres from "../../components/GenreContainer/Genres/Genres";
import css from '../../components/GenreContainer/Genres/Genres.module.css'
import {useAppSelector} from "../../hooks/ReduxHooks";

const GenresPage = () => {

    const {error} = useAppSelector(state => state.movies);

    return (
        <div className={css.Container}>
            {error ? <div>{error.message}</div> : <Genres/>}
        </div>
    );
};

export default GenresPage;