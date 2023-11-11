import React, {FC} from 'react';
import {IGenre} from "../../interfaces/IGenre";
import css from './Genres.module.css'
import {useNavigate} from "react-router-dom";

interface IProps {
    genre:IGenre
}

const Genres:FC<IProps> = ({genre}) => {

    const navigate = useNavigate();

    return (
        <div className={css.Container}>
            <div className={css.Genre}  onClick={()=>{navigate(genre.id.toString())}}>
                <div>{genre.name}</div>
            </div>
        </div>
    );
};

export default Genres;