import {getDefaultMiddleware} from "@reduxjs/toolkit";

const customMiddleware = getDefaultMiddleware({
    serializableCheck: false
})

export {customMiddleware};