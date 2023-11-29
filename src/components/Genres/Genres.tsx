import React, {FC} from 'react';
import {IGenre} from "../../interfaces/IGenre";
import css from './Genres.module.css'
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/ReduxHooks";
import {movieActions} from "../../redux/slices/moviesSlice";

interface IProps {
    genre:IGenre
}

const Genres:FC<IProps> = ({genre}) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const toGenre=()=>{
        navigate(genre.id.toString())
        dispatch(movieActions.nullGenreResults())
    }

    return (
        <div className={css.Container}>
            <div className={css.Genre}  onClick={toGenre}>
                <div>{genre.name}</div>
            </div>
        </div>
    );
};

export default Genres;