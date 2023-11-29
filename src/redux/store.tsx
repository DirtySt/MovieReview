import {configureStore} from "@reduxjs/toolkit";
import {movieReducer} from "./slices/moviesSlice";

export const store = configureStore({
    reducer: {
        movies: movieReducer,

    }
});

type RootStore = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type {RootStore, AppDispatch};