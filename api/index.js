var express = require('express');
var router = express.Router();

router.use('/Users', App.require('api/User'));
router.use('/Todos', App.require('api/Todos'));

router.route('/')
    .get((req,res)=>{
        res.send("I am serving API here...")
    });
      
module.exports = router;