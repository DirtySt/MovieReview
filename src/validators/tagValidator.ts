import Joi from "joi";

const tagValidator = Joi.object({
    tag: Joi.string().pattern(/^[a-zA-Zа-яА-яёЁіІїЇ" "]{1,20}$/).required().messages(
        {'string.pattern.base': 'Only letters min 1 max 20'}
    )
})

export {tagValidator}