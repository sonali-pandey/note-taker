const router = require("express").Router();
const {filterByQuery, createNewNote, validateNote} = require("../../lib/notes");
const { notes } = require("../../data/notes.json");

const fs = require("fs");
const path = require("path");

router.get("/notes", (req, res) => {
    res.json(notes);
});

router.post("/notes", (req, res) => {

  req.body.id = (notes.length+1).toString();
    if(!validateNote(req.body)){
        res.status(400).send("Please add Note Title.");
    }else{
    
    const note = createNewNote(req.body, notes);
    res.json(note);
    }
});

router.delete("/notes/:id", (req, res) => {

    const index = req.params.id;
   
    if (index === -1) return res.status(404).json({})
   
    notes.splice(index-1, 1);

    notes.forEach((note, index) => note.id = (index+1).toString());

    fs.writeFileSync(
        path.join(__dirname, "../../data/notes.json"),
        JSON.stringify({ notes }, null, 2)
      );

      res.json(notes);
});

module.exports = router;