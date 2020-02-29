const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, prev_Hash=""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prev_Hash = prev_Hash;
        this.hash = this.calculateHash();
    }

    calculateHash(){ return SHA256(this.index + this.prev_Hash + this.timestamp + JSON.stringify(this.data)).toString(); }
}

class BlockChain{
    constructor() { this.chain = [this.createGenesisBlock()]; }

    createGenesisBlock() { return new Block(0, "01/01/01", "Genesis block", "0"); }

    getLatestBlock() { return this.chain[this.chain.length - 1] }

    addBlock(newBlock){
        newBlock.prev_Hash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock)
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) return false; 
            if (currentBlock.prev_Hash !== previousBlock.hash) return false;
        }
        return true;
    }
}


let Coin = new BlockChain();
Coin.addBlock(new Block(1, "10/1/12", { amount: 4}));
Coin.addBlock(new Block(2, "12/1/12", { amount: 5}));
Coin.addBlock(new Block(3, "12/2/12", { amount: 6}));

console.log("Is blockchain valid? " + Coin.isChainValid());
console.log(JSON.stringify(Coin, null, 4));