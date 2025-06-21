import fs from 'fs';

export const readJSON = (filePath) => {
    if(!fs.existsSync(filePath)) {
        return []
    }

    const students = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(students);
}

export const writeJSON = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}