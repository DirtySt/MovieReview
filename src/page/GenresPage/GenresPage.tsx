import React, {useEffect, useState} from 'react';
import {genresService} from "../../services/genresService";
import Genres from "../../components/Genres/Genres";
import {IGenres} from "../../interfaces/IGenres";
import css from './GenresPage.module.css'

const GenresPage = () => {

    const [genresList, setGenresList] = useState<IGenres>({genres:null});

    useEffect(()=>{
            genresService.getAll().then(({data}) => setGenresList(data));
        },[])

    const {genres} = genresList

    if (!genres){
        return <div>Loading...</div>
    }

    return (
        <div className={css.Container}>
            {genres.map(genre => <Genres genre={genre} key={genre.id}/>)}
        </div>
    );
};

export default GenresPage;