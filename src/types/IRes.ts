import {AxiosResponse} from "axios";

export type IRes<I> = Promise<AxiosResponse<I>>;