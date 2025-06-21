import { studentSchema } from "../schemas/studentSchema.js";
import morgan from 'morgan';

export const validateStudentSchema = (req, res, next) => {
    const { error } = studentSchema.validate(req.body, {
        abortEarly: false
    });

    if (error) {
        return res.status(400).json({
            message: error.message
        });
    }
    next();
}