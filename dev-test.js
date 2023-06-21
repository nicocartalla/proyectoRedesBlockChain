/*
const Blockchain = require('./blockchain');

const bc = new Blockchain();

// 30 secs
// 6000 for btc
for (let i=0; i<10; i++){
    console.log(bc.addBlock(`foo ${i}`).toString());
}*/

const Wallet = require('./wallet');
const wallet = new Wallet();
console.log(wallet.toString());