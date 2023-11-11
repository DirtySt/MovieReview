import {Dispatch, SetStateAction} from "react";

export interface IContextType {
    darkTheme: boolean
    setDarkTheme:Dispatch<SetStateAction<boolean>>
}