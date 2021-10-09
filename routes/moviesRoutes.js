// module dependencies
const express = require("express");
const router = express.Router();

// module controller
const {list, detail, create, update, remove, search} = require('../controllers/movieController')

/* /movies */
router
    .get('/', list)
    .get('/detail/:id', detail)
    .post('/create', create)
    .put('/update/:id', update)
    .delete('/delete/:id', remove)
    .get('/search/:keywords', search)
    
module.exports = router;