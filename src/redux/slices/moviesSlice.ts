import {createAsyncThunk, createSlice, isRejected} from "@reduxjs/toolkit";
import {IMovie} from "../../interfaces/IMovie";
import {movieService} from "../../services/movieService";
import {IMovies} from "../../interfaces/IMovies";
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
    results: IMovie[];
    genreResults: IMovie[];
    nameResults: IMovie[];
    darkTheme: boolean;
    error: any
}

const initialState:IState = {
    results: [],
    genreResults: [],
    nameResults:[],
    darkTheme:null,
    error: null
}

const getAll = createAsyncThunk(
    'movieSlice/getAll',
    async(page:string,thunkAPI)=>{
        try {
            return await movieService.getAll(page);
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    });
const findById = createAsyncThunk<ThunkRes,GetByIdArgs>(
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
const findByName = createAsyncThunk<ThunkRes,GetByNameArgs>(
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
            .addMatcher(isRejected(getAll,findByName,findById),(state, action) => {
                state.error = action.payload;
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