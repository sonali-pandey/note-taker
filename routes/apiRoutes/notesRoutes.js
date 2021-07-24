const router = require('express').Router();
const {filterByQuery, createNewNote} = require('../../lib/notes')
const {notes} = require('../../data/notes.json');

router.get('/notes', (req, res) => {
    let results = notes;
    if(req.query){
        results = filterByQuery(req.query, results);
    };
    res.json(results);
});

router.post('/notes', (req, res) => {
    const note = createNewNote(req.body, notes);
    res.json(note);
});

module.exports = router;
