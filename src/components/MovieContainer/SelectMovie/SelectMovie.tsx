import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {movieService} from "../../../services/movieService";
import SelectedMovie from "./SelectedMovie/SelectedMovie";
import {ISelectMovie} from "../../../interfaces/ISelectMovie";
import {ICasts} from "../../../interfaces/ICasts";

const SelectMovie = () => {

    const {id} = useParams();

    const [movie,setMovie] = useState<ISelectMovie>(null)
    const [cast,setCast] = useState<ICasts>({id:null,cast:null})

    useEffect(()=>{
        movieService.findById(id).then(({data}) => setMovie(data));
        movieService.findByIdCast(id).then(({data}) => setCast(data));
    },[id])

    if (!movie){
        return <div>Loading...</div>
    }
    if (!cast.cast){
        return <div>Loading...</div>
    }
    if (!cast.cast || !movie){
        return <div>Loading...</div>
    }

    return (
        <div>
            <SelectedMovie movie={movie} cast={cast.cast}/>
        </div>
    );
};

export default SelectMovie;