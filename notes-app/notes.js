const fs = require('fs');
const chalk = require('chalk');

const getNotes = function() {
    return "Your notes...";
}

const addNote = function(title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function(note) {
        return note.title === title;
    });

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        console.log('New note added!');
        saveNotes(notes);
    } else {
        console.log('Note title taken!');
    }
}

const removeNote = function(title) {
    const notes = loadNotes();
    const notesToKeep = notes.filter(function(note) {
        return note.title != title;
    });
    if (notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse("No note found!"));
    } else {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse("Note removed!"));
    }
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}
const loadNotes = function() {
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
    removeNote: removeNote
}