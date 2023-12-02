import React, {FC} from 'react';
import {IGenre} from "../../../interfaces/IGenre";
import {movieActions} from "../../../redux/slices/moviesSlice";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../hooks/ReduxHooks";
import css from './Genre.module.css'


interface IProps {
    genre:IGenre
}

const Genre:FC<IProps> = ({genre}) => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const toGenre=()=>{
        navigate(genre.id.toString())
        dispatch(movieActions.nullGenreResults())
    }

    return (
        <div>
            <div className={css.Container}>
                <div className={css.Genre}  onClick={toGenre}>
                    <div>{genre.name}</div>
                </div>
            </div>
        </div>
    );
};

export default Genre;