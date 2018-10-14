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
var querystring = require('querystring');


router.post("/ProfilBilgileri" , function (req,res) {
    axios.get('https://enabizservis.saglik.gov.tr/api/Profil/GetProfilBilgileriMobile',{ 
        headers: {
            token: token,
            kb   : kb,
        }
        })
      .then(function (response) {
        var veri = JSON.parse(CircularJSON.stringify(response));
        veri.self = veri;
        return res.send({'result': 200, 'status': 'SUCCESS', 'message': 'İşlem Başarılı', 'response': veri.data });
      })
      .catch(function (error) {
        return res.send({'result': 400, 'status': 'FAIL', 'message': 'İşlem Başarısız' });
      });
});

router.post("/GetHekim" , function (req,res) {
    axios.get('https://enabizservis.saglik.gov.tr/api/Account/GetHekim?TCKimlikNo='+tc,{ 
        headers: {
            token: token,
            kb   : kb,
        }
        })
      .then(function (response) {
        var veri = JSON.parse(CircularJSON.stringify(response));
        veri.self = veri;
        return res.send({'result': 200, 'status': 'SUCCESS', 'message': 'İşlem Başarılı', 'response': veri.data });
      })
      .catch(function (error) {
        return res.send({'result': 400, 'status': 'FAIL', 'message': 'İşlem Başarısız' });
      });
});


router.post("/HastaBilgileri" , function (req,res) {
    axios.get('https://enabizservis.saglik.gov.tr/api/HastaBilgileri/GetHastaBilgileri',{ 
        headers: {
            token: token,
            kb   : kb,
        }
        })
      .then(function (response) {
        var veri = JSON.parse(CircularJSON.stringify(response));
        veri.self = veri;
        return res.send({'result': 200, 'status': 'SUCCESS', 'message': 'İşlem Başarılı', 'response': veri.data });
      })
      .catch(function (error) {
        return res.send({'result': 400, 'status': 'FAIL', 'message': 'İşlem Başarısız' });
      });
});


router.post("/EnYakinHastaneler" , function (req,res) {
    var boylam = req.body.boylam
    var enlem  = req.body.enlem
    axios.post('https://enabizservis.saglik.gov.tr/api/HastaBilgileri/EnYakinHastaneler',querystring.stringify({
        boylam: boylam,
        enlem: enlem
    }),{ 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token: token,
            kb   : kb,
        }
        })
      .then(function (response) {
        var veri = JSON.parse(CircularJSON.stringify(response));
        veri.self = veri;
        return res.send({'result': 200, 'status': 'SUCCESS', 'message': 'İşlem Başarılı', 'response': veri.data });
      })
      .catch(function (error) {
        return res.send({'result': 400, 'status': 'FAIL', 'message': 'İşlem Başarısız' });
      });
});


router.post("/Randevular" , function (req,res) {
    axios.get('https://enabizservis.saglik.gov.tr/api/Randevular/GetRandevular',{
        headers: {
            token: token,
            kb   : kb,
        }
        })
      .then(function (response) {
        var veri = JSON.parse(CircularJSON.stringify(response));
        veri.self = veri;
        return res.send({'result': 200, 'status': 'SUCCESS', 'message': 'İşlem Başarılı', 'response': veri.data });
      })
      .catch(function (error) {
        return res.send({'result': 400, 'status': 'FAIL', 'message': 'İşlem Başarısız'});
      });
});

router.post("/IlacBilgileri" , function (req,res) {
  var barcode = req.body.barcode
  axios.get('https://enabizservis.saglik.gov.tr/api/HastaBilgileri/GetVademecumBilgileri?barcode='+barcode,{
      headers: {
          token: token,
          kb   : kb,
      }
      })
    .then(function (response) {
      var veri = JSON.parse(CircularJSON.stringify(response));
      veri.self = veri;
      return res.send({'result': 200, 'status': 'SUCCESS', 'message': 'İşlem Başarılı', 'response': veri.data });
    })
    .catch(function (error) {
      return res.send({'result': 400, 'status': 'FAIL', 'message': 'İşlem Başarısız'});
    });
});

router.post("/ReceteDetay" , function (req,res) {
  var takip_no = req.body.takip_no;
  var receteNo = req.body.recete_no
  axios.post('https://enabizservis.saglik.gov.tr/api/HastaBilgileri/GetReceteDetay',querystring.stringify({
      data: JSON.stringify({"SYSTakipNo":takip_no,"ReceteNo":receteNo})
  }),{ 
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          token: token,
          kb   : kb,
      }
      })
    .then(function (response) {
      var veri = JSON.parse(CircularJSON.stringify(response));
      veri.self = veri;
      return res.send({'result': 200, 'status': 'SUCCESS', 'message': 'İşlem Başarılı', 'response': veri.data });
    })
    .catch(function (error) {
      return res.send({'result': 400, 'status': 'FAIL', 'message': 'İşlem Başarısız' });
    });
});


router.post("/TahlilBilgileri" , function (req,res) {
  axios.get('https://enabizservis.saglik.gov.tr/api/HastaBilgileri/GetTahlilBilgileri',{
      headers: {
          token: token,
          kb   : kb,
      }
      })
    .then(function (response) {
      var veri = JSON.parse(CircularJSON.stringify(response));
      veri.self = veri;
      return res.send({'result': 200, 'status': 'SUCCESS', 'message': 'İşlem Başarılı', 'response': veri.data });
    })
    .catch(function (error) {
      return res.send({'result': 400, 'status': 'FAIL', 'message': 'İşlem Başarısız'});
    });
});


router.post("/GetReceteBilgileri" , function (req,res) {
  axios.get('https://enabizservis.saglik.gov.tr/api/HastaBilgileri/GetReceteBilgileri',{
      headers: {
          token: token,
          kb   : kb,
      }
      })
    .then(function (response) {
      var veri = JSON.parse(CircularJSON.stringify(response));
      veri.self = veri;
      return res.send({'result': 200, 'status': 'SUCCESS', 'message': 'İşlem Başarılı', 'response': veri.data });
    })
    .catch(function (error) {
      return res.send({'result': 400, 'status': 'FAIL', 'message': 'İşlem Başarısız'});
    });
});

module.exports = router
