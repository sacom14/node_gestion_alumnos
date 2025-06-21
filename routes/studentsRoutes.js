import express from 'express';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../controllers/studentsController.js';
import { validateStudentSchema } from '../middlewares/middleware.js';

const router = express.Router();

router.get('/', getStudents);
router.post('/', validateStudentSchema, createStudent);
router.put('/:id', validateStudentSchema, updateStudent);
router.delete('/:id', deleteStudent);

export default router;