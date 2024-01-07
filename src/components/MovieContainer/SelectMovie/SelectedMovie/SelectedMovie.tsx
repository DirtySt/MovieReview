import React, {FC, useEffect} from 'react';
import css from './SelectedMovie.module.css'
import {ISelectMovie} from "../../../../interfaces/ISelectMovie";
import {ICast} from "../../../../interfaces/ICast";
import {useAppSelector} from "../../../../hooks/ReduxHooks";

interface IProps {
    movie:ISelectMovie
    cast:ICast[]
}

const SelectedMovie:FC<IProps> = ({movie,cast}) => {
    const {adult,poster_path,runtime,genres,homepage} = movie

    console.log(movie)

    const {darkTheme} = useAppSelector(state => state.movies);

    let info = document.getElementsByClassName(css.info);
    let overview = document.getElementsByClassName(css.overview);
    let artist = document.getElementsByClassName(css.artist);
    let container = document.getElementsByClassName(css.Container);

    useEffect(()=>{
        if (darkTheme){
            container.item(0).classList.add(css.Dark)
            info.item(0).classList.add(css.DarkInfo)
            overview.item(0).classList.add(css.DarkOverview)
            for (let i = 0;i < artist.length;i++){
                artist.item(i).classList.add(css.DarkArtist)
            }
            artist.item(0).classList.add(css.DarkArtist)
        }
        else {
            container.item(0).classList.remove(css.Dark)
            info.item(0).classList.remove(css.DarkInfo)
            overview.item(0).classList.remove(css.DarkOverview)
            for (let i = 0;i < artist.length;i++){
                artist.item(i).classList.remove(css.DarkArtist)
            }

        }
    },[darkTheme,artist,info,overview])

    return (
        <div className={css.Container}>
            <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`} className={css.Poster} alt={'poster'}/>
            <h2>Main cast</h2>
            <div className={css.info}>
                <div>title:{movie.title}</div>
                <div>adult:{adult ? "adult" : "not adult"}</div>
                <div>runtime:{runtime}min</div>
                <div>genres:{genres.map(genre=><> {genre.name}</>)}</div>
                <div>home:<a href={homepage}>{homepage}</a></div>
                <div>original language:{movie.original_language}</div>
                <div>status:{movie.status}</div>
                <div>vote:{movie.vote_average}</div>
                <hr/>
            </div>
            <div className={css.overview}>{movie.overview}</div>
            <div className={css.cast}>
                {cast.map(artist=>
                    <div className={css.artist}>
                        <img src={`https://image.tmdb.org/t/p/w300/${artist.profile_path}`} alt={'artist'}/>
                        <div>{artist.name}</div>
                    </div>)}
            </div>
        </div>
    );
};

export default SelectedMovie;