// module dependencies
const express = require("express");
const router = express.Router();

// module controller
const {list, detail, create} = require('../controllers/characterController')

//middlewares
const upload = require('../middlewares/characterImage');

/* /characters */
router
    .get('/', list)
    .get('/detail/:id', detail)
    .post('/create', upload.single("image"), create)

    
module.exports = router;