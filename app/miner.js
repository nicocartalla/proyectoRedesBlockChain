const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

class Miner {
    constructor(blockchain, transactionPool, wallet, p2pServer){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine(){
        // grab valid transaction from the pool
        const validTransactions = this.transactionPool.validTransactions();

        // include a reward for the miner
        validTransactions.push(
            Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
        );
        
        // create a block consisting of the valid transaction
        const block = this.blockchain.addBlock(validTransactions);
        // inform p2p server sync chain includes those block into the transaction
        this.p2pServer.syncChains();
        // clear the transaction pool
        this.transactionPool.clear();
        // broadcast every miner clear transaction pool
        this.p2pServer.broadcastClearTransactions();

        return block;
    }
}

module.exports = Miner;