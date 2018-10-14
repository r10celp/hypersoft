var express = require('express')
var router = express.Router()
var L = require("i18n");
var db = require('./db')
var fs = require('fs');
var token = '*************************************';
var kb    = '******';
var tc    = '***********';
var axios = require('axios');
var CircularJSON = require('circular-json');

router.post("/map_detail" , function (req,res) {

    var enlem  = req.body.enlem;
    var boylam = req.body.boylam;


    db.query("SELECT * FROM location", function(err,result){
        if(err){
            return res.send({'result': 400, 'message': 'Db Hatası '+err})
          }
        
        return res.send({'result': 200, 'status': 'SUCCES', 'message': 'İşlem başarılı', 'response': result})
    })

});


module.exports = router
