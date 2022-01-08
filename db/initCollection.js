const drinks = require("../Models/drinks").default;
const bakedGoods = require("../Models/bakedGoods").default;
const connect = require("./connect").default;
const {
  initDrinksTransaction,
  initBakedGoodsTransaction,
} = require("./transactions");

const initDrinks = () => {
  connect(initDrinksTransaction);
};

const initBakedGoods = () => {
  connect(initBakedGoodsTransaction);
};

const main = () => {
  const args = process.argv.slice(2);
  console.log(args);
};
main();
