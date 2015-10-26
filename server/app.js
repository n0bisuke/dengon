'use strict'

// const MilkCocoa = require('milkcocoa');
import MilkCocoa from 'milkcocoa';
// const milkcocoa = new MilkCocoa('juiceig81r3wr.mlkcca.com');
const milkcocoa = new MilkCocoa("leadifc51uav.mlkcca.com");
const ds = milkcocoa.dataStore('message');

setInterval(()=>{
  ds.send({v:1}, (err, sended) => {
    console.log('送信:', sended);
  });
},2000);

ds.on('send', (sended) => {
  console.log('受信:',sended);
});
