'use strict'

console.log(111);

const MilkCocoa = require('milkcocoa');
//import MilkCocoa from 'milkcocoa';
// const milkcocoa = new MilkCocoa('juiceig81r3wr.mlkcca.com');
// const milkcocoa = new MilkCocoa("dogi9jz8c16.mlkcca.com");
const milkcocoa = new MilkCocoa("leadifc51uav.mlkcca.com");
const ds = milkcocoa.dataStore('message');

setInterval(()=>{
  ds.send({v:'aaaa'}, (err, sended) => {
    console.log('送信:', sended);
  });
},2000);

ds.on('push', (sended) => {
  console.log('受信:',sended);
});
