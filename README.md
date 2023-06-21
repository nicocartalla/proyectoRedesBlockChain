## The Merlion Stable Coin

```
npm i nodemon --save-dev
npm i jest --save-dev
```

Runtime libraries
```
npm i crypto-js --save
npm i express --save
```
## Node 1
```
npm run dev
```
## Node 2
```
HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
```
## Node 3
```
HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev
```

## Proof of work
(PoW) system (or protocol, or function) is an economic measure to deter denial of service attacks and other service abuses such as spam on a network by requiring some work from the service requester, usually meaning processing time by a computer.

* Any peer can replace the chain
* POW makes it expensive to generate corrupt chains
* Is quite manageable to submit one block rather than the entire chain.

Bitcoin POW uses hashcash created since 1997 it is used to prevent for email spamming
Difficulty = 6 
Hash = 000000haxi2910jasdfsjfd

Generate the hash until all the leading zeroes macthes.
A nonce value adjust new hash is generated

The computation work is 'mining'

The difficulty sets a rate of mining 

Bitcoin sets the rate to new block approximately around every 10 minutes.

## 51% attack 

* Dishonest miner owns the 51% of the network power
* A 51% attack for bitcoin would be more than $6 billion 

Dynamic Block adjust difficulty
* lastBlock timestamp + mine rate > currentTime then we know is too easy increase difficulty
 +1 else -1

 ## Wallets, Keys and transaction

 ### What is a wallet?
 * Have a balance field
 * Store keys (Private Keys and Public Keys) Everyone sees the Public Keys
 Private Key - used to generate signatures
 Public Key - used to verify the signatures and also public account address

 ### Transactions
 * Input of the transaction details
 ** timestamp,balance and public key

 * Output chain as transactions

 ### Digital Signatures
 * Create wallet
 * Elliptic-curve cryptography (ECC) is an approach to public-key cryptography based on the algebraic structure of elliptic curves over finite fields. ECC requires smaller keys compared to non-ECC cryptography (based on plain Galois fields) to provide equivalent security.
 * Install npm i elliptic --save 

Mid 1980s 

 y^{2}=x^{3}+ax+b,\,

 https://www.youtube.com/watch?v=dCvB-mhkT0w
