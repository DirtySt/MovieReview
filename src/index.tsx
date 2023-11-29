import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import css from './index.module.css'
import {ContextProvider} from "./hoc/ContextProvider";
import {Provider} from "react-redux";
import {store} from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <ContextProvider>
            <RouterProvider router={router}/>
        </ContextProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

