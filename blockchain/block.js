// 13 difficulty
const ChainUtil = require('../chain-util');
const { DIFFICULTY, MINE_RATE } = require('../config.js');

class Block {
    // 1
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    // 2
    toString(){
        return `Block -
            Timestamp   : ${this.timestamp}
            Last Hash   : ${this.lastHash.substring(0,10)}
            Hash        : ${this.hash.substring(0,10)}
            Nonce       : ${this.nonce}
            Difficulty  : ${this.difficulty}
            Data        : ${this.data}`;
    }

    // 3
    /** static do not need to instance */
    static genesis(){
        return new this('Genesis Time', '------', 'f1r57-h45h', [], 0, DIFFICULTY);
    }


    // 4
    static mineBlock(lastBlock, data){
        let hash, timestamp;
        
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;
        
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data,nonce ,difficulty);
        }while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));
        // detect 4 leading zeroes bingo
        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    // 5
    //back stick construct a string for the hashing
    static hash(timestamp, lastHash, data, nonce, difficulty){
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    // 9
    static blockHash(block){
        const { timestamp, lastHash, data , nonce, difficulty} = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    // 14 dynamic difficulty adjustment.
    static adjustDifficulty(lastBlock, currentTime){
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty -1;
        return difficulty;
    }
}

module.exports = Block;