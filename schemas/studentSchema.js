import Joi from 'joi';

export const studentSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    age: Joi.number().integer().min(1).max(100).required(),
    email: Joi.string().email().required(),
    course: Joi.string().optional(),
    description: Joi.string().min(3).max(500).optional(),
    modified: Joi.date().default(() => new Date()),
});
