import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovie} from "../../interfaces/IMovie";
import {movieService} from "../../services/movieService";
import {IMovies} from "../../interfaces/IMovies";
import {IRes} from "../../types/IRes";
import {genresService} from "../../services/genresService";

interface GetByIdArgs{
    page: string;
    id:string
}
interface GetByNameArgs {
    page: string;
    tag:string
}
interface ThunkRes {
    data:IMovies
}

interface IState {
    page: number;
    genrePage: number;
    results: IMovie[];
    genreResults: IMovie[];
    nameResults: IMovie[];
}

const initialState:IState = {
    page: null,
    genrePage:null,
    results: [],
    genreResults: [],
    nameResults:[]
}

const getAll = createAsyncThunk(
    'movieSlice/getAll',
    async(page:string,thunkAPI)=>{
        try {
            return await movieService.getAll(page);
        } catch (e) {
            console.log(e);
        }
    });
const findById = createAsyncThunk<ThunkRes,GetByIdArgs>(
    'movieSlice/findById',
    async({id,page},thunkAPI)=>{
        try {
            return await genresService.findById(id, page);
        }
        catch (e) {
            console.log(e);
        }
    }
)
const findByName = createAsyncThunk<ThunkRes,GetByNameArgs>(
    'movieSlice/findByName',
    async({tag,page},thunkAPI)=>{
        try {
            return await movieService.searchByName(tag, page);
        }catch (e) {
            console.log(e)
        }
    }
)

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers:{},
    extraReducers:builder =>
        builder
            .addCase(getAll.fulfilled,(state, action) => {
                const {data} = action.payload;
                state.results = data.results;
                state.page = data.page
            })
            .addCase(findById.fulfilled,(state, action) => {
                const {data} = action.payload;
                state.genreResults = data.results;
                state.genrePage = data.page
            })
            .addCase(findByName.fulfilled,(state, action) => {
                const {data} = action.payload;
                state.nameResults = data.results;
            })
})

const {reducer: movieReducer, actions} = movieSlice;

const movieActions = {
    ...actions,
    getAll,
    findById,
    findByName
};

export {movieActions,movieReducer}