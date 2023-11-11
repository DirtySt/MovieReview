import {IRes} from "../types/IRes";
import {IMovies} from "../interfaces/IMovies";
import {axiosService} from "./axiosService";
import {token, urls} from "../constants/urls";
import {ISelectMovie} from "../interfaces/ISelectMovie";
import {ICasts} from "../interfaces/ICasts";

const movieService = {
    getAll:(page:string):IRes<IMovies> => axiosService.get(urls.movies.base,{headers:{Authorization: `Bearer ${token}`},params:{page:page}}),
    findById: (id: string): IRes<ISelectMovie> => axiosService.get(`${urls.movies.byId}/${id}`, {headers:{Authorization: `Bearer ${token}`}}),
    searchByName: (name:string,page:string): IRes<IMovies> => axiosService.get(urls.search.searchMovie,{headers:{Authorization: `Bearer ${token}`},params:{page:page,query:name}}),
    findByIdCast: (id: string): IRes<ICasts> => axiosService.get(`${urls.movies.byId}/${id}/credits`, {headers:{Authorization: `Bearer ${token}`}}),
}

export {movieService}