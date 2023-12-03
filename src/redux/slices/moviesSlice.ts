import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {IMovie} from "../../interfaces/IMovie";
import {movieService} from "../../services/movieService";
import {genresService} from "../../services/genresService";
import {IGetByIdArgs} from "../../interfaces/GetByIdArgs";
import {IGetByNameArgs} from "../../interfaces/GetByNameArgs";
import {IThunkRes} from "../../interfaces/IThunkRes";
import {IGenre} from "../../interfaces/IGenre";

interface IState {
    results: IMovie[];
    genres: IGenre[];
    genreResults: IMovie[];
    nameResults: IMovie[];
    darkTheme: boolean;
    error: any;
}

const initialState:IState = {
    results: [],
    genres: [],
    genreResults: [],
    nameResults:[],
    darkTheme:null,
    error: null,
}

const getAll = createAsyncThunk(
    'movieSlice/getAll',
    async(page:string,thunkAPI)=>{
        try {
            return await movieService.getAll(page);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    });
const getGenres = createAsyncThunk(
    'movieSlice/getGenres',
    async(_,thunkAPI)=>{
        try {
            return await genresService.getAll();
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
const findById = createAsyncThunk<IThunkRes,IGetByIdArgs>(
    'movieSlice/findById',
    async({id,page},thunkAPI)=>{
        try {
            return await genresService.findById(id, page);
        }
        catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
const findByName = createAsyncThunk<IThunkRes,IGetByNameArgs>(
    'movieSlice/findByName',
    async({tag,page},thunkAPI)=>{
        try {
            return await movieService.searchByName(tag, page);
        }catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        darkThemeChanger: (state) => {
            state.darkTheme = !state.darkTheme;
        },
        nullGenreResults: (state) => {
            state.genreResults = null;
        }
    },
    extraReducers:builder =>
        builder
            .addCase(getAll.fulfilled,(state, action) => {
                const {data} = action.payload;
                state.results = data.results;
            })
            .addCase(findById.fulfilled,(state, action) => {
                const {data} = action.payload;
                state.genreResults = data.results;
            })
            .addCase(findByName.fulfilled,(state, action) => {
                const {data} = action.payload;
                state.nameResults = data.results;
            })
            .addCase(getGenres.fulfilled,(state, action) => {
                const {data} = action.payload;
                state.genres = data.genres
            })
            .addMatcher(isFulfilled(getAll,findByName,findById,getGenres),state => {
                state.error = null
            })
            .addMatcher(isRejected(getAll,findByName,findById,getGenres),(state, action) => {
                state.error = action.payload;
            })
})

const {reducer: movieReducer, actions} = movieSlice;

const movieActions = {
    ...actions,
    getAll,
    findById,
    findByName,
    getGenres
};

export {movieActions,movieReducer}