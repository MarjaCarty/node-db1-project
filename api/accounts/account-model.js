const db = require("../../data/dbConfig");

module.exports = {
  findAll() {
    return db("accounts");
  },
  findById(id) {
    return db("accounts").where("id", id).first();
  },
  create(account) {
    return db("accounts")
      .insert(account)
      .then(([id]) => {
        return db("accounts").where("id", id).first();
      });
  },
  update(id, changes) {
    return db("accounts")
      .where("id", id)
      .update(changes)
      .then(() => {
        return db("accounts").where("id", id).first();
      });
  },
  delete(id) {
    return db("accounts").where("id", id).del();
  },
};
