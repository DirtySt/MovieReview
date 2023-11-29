import React, {FC, useEffect} from 'react';
import {IMovie} from "../../../interfaces/IMovie";
import css from './movie.module.css'
import {useNavigate} from "react-router-dom";
import StarRatings from "react-star-ratings";
import {useAppSelector} from "../../../hooks/ReduxHooks";

interface IProps{
    movie: IMovie;
}

const Movie:FC<IProps> = ({movie}) => {

    const {darkTheme} = useAppSelector(state => state.movies)

    let el = document.getElementsByClassName(css.Element);

    useEffect(()=>{
        if (darkTheme){
            for (let i = 0;i < el.length;i++){
                el.item(i).classList.add(css.Dark)
            }
        }
        else {
            for (let i = 0;i < el.length;i++){
                el.item(i).classList.remove(css.Dark)
            }
        }
    },[darkTheme,el])



    const {poster_path,title,vote_average,id} = movie
    const navigate = useNavigate();
    return (
        <div className={css.Element} onClick={() => {
            navigate(`/movies/${id}`)
        }}>
            <div className={css.poster}>
                <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt={'poster'}/>
            </div>
            <div className={css.description}>
                <StarRatings
                    rating={vote_average}
                    starRatedColor="orange"
                    numberOfStars={10}
                    name='rating'
                    starDimension="20px"
                    starSpacing='2px'
                />
                <div>{title}</div>
                <div>{movie.release_date}</div>
            </div>
        </div>
    );
};

export default Movie;