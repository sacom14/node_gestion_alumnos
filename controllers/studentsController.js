import { readJSON, writeJSON } from '../services/studentService.js';
import { studentSchema } from '../schemas/studentSchema.js';
import { validateUniqueEmail } from '../validations/studentsValidations.js';
import { randomUUID } from 'crypto';

const STUDENTS_FILE = './data/students.json';

export const getStudents = (req, res) => {
    const fields = readJSON(STUDENTS_FILE);
    res.status(200).json(fields);
}

export const createStudent = (req, res) => {
    const students = readJSON(STUDENTS_FILE);
    // Se usa el validate con { stripUnknown: true } para obtener el valor con defaults aplicados, en est caso es para el CreatedAt
    const { error, value } = studentSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    if (!validateUniqueEmail(value.email)) {
        return res.status(409).json({
            message: 'Email already exists'
        });
    }

    const newStudent = {
        ...value,
        id: randomUUID(),
        modified: new Date().toISOString(),
    }

    students.push(newStudent);
    writeJSON(STUDENTS_FILE, students);
    res.status(201).json(newStudent);
}

export const updateStudent = (req, res) => {
    const students = readJSON(STUDENTS_FILE);
    const { id } = req.params;
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: 'Student not found'
        });
    }
    const { error, value } = studentSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    const uupdatedStudent = {
        ...student,
        ...value,
    }

    const updatedStudents = students.map(s => s.id === id ? uupdatedStudent : s);
    writeJSON(STUDENTS_FILE, updatedStudents);
    res.status(200).json(uupdatedStudent);
}

export const deleteStudent = (req, res) => {
    const students = readJSON(STUDENTS_FILE);
    const { id } = req.params;
    const studentIndex = students.findIndex(s => s.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({
            message: 'Student not found'
        });
    }

    students.splice(studentIndex, 1);
    writeJSON(STUDENTS_FILE, students);
    res.status(204).json({
        message: 'Student deleted successfully'
    });
}