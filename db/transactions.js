//Init transactions
const initDrinksTransaction = (db) => {
  try {
    db.createCollection(drinks.key, drinks.validator);
  } catch (err) {
    console.error(err);
  }
};
const initBakedGoodsTransaction = (db) => {
  try {
    db.createCollection(bakedGoods.key, bakedGoods.validator);
  } catch (err) {
    console.error(err);
  }
};

//Rest Transactions

exports.init = { initDrinksTransaction, initBakedGoodsTransaction };
