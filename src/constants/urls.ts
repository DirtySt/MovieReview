const APIkey = 'd14b6ad1b8d1226f950d54500a10d410';

const baseURL = 'https://api.themoviedb.org/3/';

const movies = `discover/movie`
const find = `movie/`
const genresList = 'genre/movie/list'
const search = 'search/movie'

const urls = {
    movies:{
        base: movies,
        byId: find
    },
    genres:{
        genresList: genresList
    },
    search:{
        searchMovie: search
    }
}


const token = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTRiNmFkMWI4ZDEyMjZmOTUwZDU0NTAwYTEwZDQxMCIsInN1YiI6IjY1NGI5ZmFhZmQ0ZjgwMDEzY2ViMTFiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HPbpO6O62t57f5_AeY4DEBHL9GOpObGWqQ1as2KQei0`;

export {baseURL,APIkey,token,urls}