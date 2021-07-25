const { response } = require("express");
const fs = require("fs");
const path = require("path");

// creating new note
function createNewNote(body, notesArray){
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../data/notes.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );

    return note;
}

// Making sure new note has a title
function validateNote(note) {
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    return true;
}

module.exports = {
    createNewNote,
    validateNote,
};