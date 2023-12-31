// 10
const express = require("express");
const Blockchain = require("../blockchain");
const bodyParser = require("body-parser");
//12
const P2pServer = require("./p2p-server");

//15
const Wallet = require("../wallet");
const TransactionPool = require("../wallet/transaction-pool");
const Miner = require('./miner');

const HTTP_PORT = process.env.HTTP_PORT || 3001;
// use proxy 
process.env["HTTP_PROXY"] = "http://127.0.0.1:8080";
process.env["HTTPS_PROXY"] = "http://127.0.0.1:8080";
const app = express();

app.use(bodyParser.json());
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
//12
const p2pServer = new P2pServer(bc, tp);
const miner = new Miner(bc, tp, wallet, p2pServer);

app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});

app.post("/mine", (req, res) => {
  console.log(req.body);
  const block = bc.addBlock(req.body.data);
  console.log(`New block added : ${block.toString()}`);
  p2pServer.syncChains();
  res.redirect("/blocks");
});

app.get("/transactions", (req, res) => {
  res.json(tp.transactions);
});

app.post("/transact", (req, res) => {
  const { recipient, amount } = req.body;
  const transaction = wallet.createTransaction(recipient, amount, bc, tp);
  if (transaction == -1) {
    res.status(422).json({ error: "Amount exceeds balance" });
    return;
  }
  console.log(">>>  " + transaction);
  p2pServer.broadcastTransaction(transaction);
  res.redirect("/transactions");
});

app.post('/mine-transactions', (req,res)=>{
  const block = miner.mine();
  console.log(`New block added ${block.toString()}`);
  res.redirect('/blocks');
});

app.get("/wallet-info", (req, res) => {
  res.json({
    address: wallet.publicKey,
    balance: wallet.calculateBalance(bc)
  });
});

app.get('/public-key', (req, res) => {
  res.json({publicKey: wallet.publicKey});
});

app.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`);
});
//12
p2pServer.listen();