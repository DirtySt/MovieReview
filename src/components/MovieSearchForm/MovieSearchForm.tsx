import React from 'react';

import {SubmitHandler, useForm} from "react-hook-form";
import {tagValidator} from "../../validators/tagValidator";
import {joiResolver} from "@hookform/resolvers/joi";
import {useNavigate} from "react-router-dom";

const MovieSearchForm = () => {

    const navigate = useNavigate();

    const {reset, handleSubmit, formState: {isValid},register} = useForm({
        resolver: joiResolver(tagValidator)
    });
    
    const save:SubmitHandler<any> = (tag) => {
        navigate(`/movies/search/${tag.tag}`)
        reset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit(save)}>
                <input type={"text"} placeholder={'search'} {...register('tag')}/>
                <button disabled={!isValid}>search</button>
            </form>
        </div>
    );
};

export default MovieSearchForm;