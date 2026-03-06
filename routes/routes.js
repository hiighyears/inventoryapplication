const express = require('express');
const router = express.Router();
const maincontroller = require('../controllers/maincontroller');

router.get('/',maincontroller.getmessageindex);
router.get('/new',maincontroller.getmessageform);
router.post('/new',maincontroller.submitmessageform);
router.get("/new/messages/:id",maincontroller.getmessagedetails);


module.exports = router; 