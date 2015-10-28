var express = require('express');
var MilkCocoa = require('milkcocoa');
var milkcocoa = new MilkCocoa("juiceig81r3wr.mlkcca.com");
var ds = milkcocoa.dataStore('dengon');
var app = express();

app.get('/', function (req, res) {
  console.log(req.query);
  var mes = '';
  if(req.query.hito === 'imouto'){
    mes = 'こんにちは、いもうと。伝言があるよ。';
    ds.stream().size(1).next(function(err, data) {
        console.log(data[0].value.message); // 最新の10件のデータ
        mes += data[0].value.message;
        res.send({mes: mes, mood: data[0].value.mood, dear: data[0].value.dear});
    });

  }else if(req.query.hito === 'nobisuke'){
    mes = 'こんにちは、のびすけ';
  }

});

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
