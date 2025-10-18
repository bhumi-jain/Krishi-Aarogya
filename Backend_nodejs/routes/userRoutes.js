const express = require("express");
const {
    createUser, getAllUsers 
  } = require("../controllers/usercontroller.js");


const router = express.Router();

router.post('/signup', createUser);
router.post('/login', getAllUsers);

module.exports = router;
