const drinks = require("../Models/drinks");
const bakedGoods = require("../Models/baked-goods");
const runTransaction = require("./connect");

const {
  initDrinksTransaction,
  dropDrinksTransaction,
  initBakedGoodsTransaction,
  dropBakedGoodsTransaction,
} = require("./transactions");

const initDrinks = async () => {
  await runTransaction(initDrinksTransaction);
};
const dropDrinks = async () => {
  await runTransaction(dropDrinksTransaction);
};
const initBakedGoods = async () => {
  await runTransaction(initBakedGoodsTransaction);
};
const dropBakedGoods = async () => {
  await runTransaction(dropBakedGoodsTransaction);
};

const commands = {
  initDrinks,
  dropDrinks,
  initBakedGoods,
  dropBakedGoods,
};

const main = () => {
  const args = process.argv.slice(2);
  if (args.length === 0)
    console.error("ERROR: must provide an initialization argument");
  args.forEach((command) => {
    try {
      commands[command]();
    } catch (err) {
      console.error(`ERROR: ${command} is not a valid command`);
    }
  });
};
main();
