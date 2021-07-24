const router = require('express').Router();
const {filterByQuery} = require('../../lib/notes')
const {notes} = require('../../data/notes.json');

router.get('/notes', (req, res) => {
    let results = notes;
    if(req.query){
        results = filterByQuery(req.query, results);
    };
    res.json(results);
});

module.exports = router;
