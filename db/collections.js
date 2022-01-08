const drinks = require("../Models/drinks").default;
const bakedGoods = require("../Models/bakedGoods").default;
const run = require("./connect").run;
const {
  initDrinksTransaction,
  dropDrinksTransaction,
  initBakedGoodsTransaction,
  dropBakedGoodsTransaction,
} = require("./transactions").initTransactions;

const initDrinks = async () => {
  await run(initDrinksTransaction);
};
const dropDrinks = async () => {
  await run(dropDrinksTransaction);
};

const initBakedGoods = async () => {
  await run(initBakedGoodsTransaction);
};
const dropBakedGoods = async () => {
  await run(dropBakedGoodsTransaction);
};

const commands = {
  initDrinks: initDrinks,
  dropDrinks: dropDrinks,
  initBakedGoods: initBakedGoods,
  dropBakedGoods: dropBakedGoods,
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
