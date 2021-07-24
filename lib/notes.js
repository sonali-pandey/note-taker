const fs = require("fs");
const path = require("path");

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;

    if(query.title){
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if(query.text){
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }

    // return filtered result
    return filteredResults;
};

function createNewNote(body, notesArray){
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../data/notes.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    );

    return note;
}

module.exports = {
    filterByQuery,
    createNewNote
};