const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return "Your notes...";
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (duplicateNote === undefined) {
        notes.push({
            title: title,
            body: body
        });
        console.log(chalk.green.inverse('New note added!'));
        saveNotes(notes);
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
}
const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title != title);

    if (notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse("No note found!"));
    } else {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse("Note removed!"));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse("Your notes"));
    notes.forEach((note) => console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (note === undefined) {
        console.log(chalk.red.inverse("No note found!"));
    } else {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    }
}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const data = dataBuffer.toString();
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}