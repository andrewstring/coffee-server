const drinks = require("../Models/drinks");
const bakedGoods = require("../Models/baked-goods");

//Init transactions
const initDrinksTransaction = async (db) => {
  try {
    await db.createCollection(drinks.key);
  } catch (err) {
    console.error(err);
  }
};
const dropDrinksTransaction = async (db) => {
  try {
    await db.collection("drinks").drop();
  } catch (err) {
    console.error(err);
  }
};

const initBakedGoodsTransaction = async (db) => {
  try {
    await db.createCollection(bakedGoods.key);
  } catch (err) {
    console.error(err);
  }
};
const dropBakedGoodsTransaction = async (db) => {
  try {
    await db.collection("bakedGoods").drop();
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  initDrinksTransaction,
  dropDrinksTransaction,
  initBakedGoodsTransaction,
  dropBakedGoodsTransaction,
};
