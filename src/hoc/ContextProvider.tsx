import {createContext, FC, ReactNode, useState} from "react";
import {IContextType} from "../interfaces/IContextType";

interface IProps {
    children: ReactNode;
}

const Context = createContext<null | IContextType>(null);

const ContextProvider:FC<IProps> = ({children}) => {
    const [darkTheme,setDarkTheme] = useState<boolean>(null);

    return (
        <Context.Provider value={{darkTheme,setDarkTheme}}>
            {children}
        </Context.Provider>
    );
};

export {
    ContextProvider,
    Context
};