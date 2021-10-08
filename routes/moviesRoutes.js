// module dependencies
const express = require("express");
const router = express.Router();

// module controller
const {list, detail, create} = require('../controllers/movieController')

/* /movies */
router
    .get('/', list) // list
    .get('/:id', detail) // detail
    .post('/create', create) // create
    
module.exports = router;