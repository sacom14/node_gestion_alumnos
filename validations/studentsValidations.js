import { readJSON } from '../services/studentService.js';

const STUDENTS_FILE = './data/students.json';

export const validateUniqueEmail = (email) => {
    const students = readJSON(STUDENTS_FILE);
    const existingStudent = students.find(student =>
        student.email.toLowerCase() === email.toLowerCase()
    );

    return !existingStudent;
};