const router = require("express").Router();
const {filterByQuery, createNewNote, validateNote} = require("../../lib/notes");
const { notes } = require("../../data/notes.json");

router.get("/notes", (req, res) => {
    // let results = notes;
    // if(req.query){
    //     results = filterByQuery(req.query, results);
    // };
    // res.json(results);
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

module.exports = router;