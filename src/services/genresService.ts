import {IRes} from "../types/IRes";
import {axiosService} from "./axiosService";
import {token, urls} from "../constants/urls";
import {IGenres} from "../interfaces/IGenres";
import {IMovies} from "../interfaces/IMovies";

const genresService = {
    getAll:():IRes<IGenres> => axiosService.get(urls.genres.genresList,{headers:{Authorization: `Bearer ${token}`}}),
    findById:(id: string,page: string):IRes<IMovies> => axiosService.get(`${urls.movies.base}?with_genres=${id}`, {headers:{Authorization: `Bearer ${token}`},params:{page:page}}),
}

export {genresService}