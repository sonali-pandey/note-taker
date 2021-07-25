const router = require("express").Router();
const {createNewNote, validateNote} = require("../../lib/notes");
const { notes } = require("../../data/notes.json");

const fs = require("fs");
const path = require("path");

// getting the existing notes
router.get("/notes", (req, res) => {
    res.json(notes);
});

// adding a new note
router.post("/notes", (req, res) => {

  req.body.id = (notes.length+1).toString();
    if(!validateNote(req.body)){
        res.status(400).send("Please add Note Title.");
    }else{
    
    const note = createNewNote(req.body, notes);
    res.json(note);
    }
});


// delete a note
router.delete("/notes/:id", (req, res) => {

    // getting index of the note to be deleted
    const index = req.params.id;
   
    if (index === -1) return res.status(404).json({})
   
    // removing the note from the notes array
    notes.splice(index-1, 1);

    // updating the existing notes's id
    notes.forEach((note, index) => note.id = (index+1).toString());

    // writing the new notes array to the database json file
    fs.writeFileSync(
        path.join(__dirname, "../../data/notes.json"),
        JSON.stringify({ notes }, null, 2)
      );

      res.json(notes);
});

module.exports = router;