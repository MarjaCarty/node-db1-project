const express = require("express");
const Account = require("./account-model");

const router = express.Router();

const validateAccountId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const checkedAccount = await Account.findById(id);

    if (!checkedAccount) {
      res
        .status(404)
        .json({ message: "an account with this id does not exist" });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const validateAccount = (req, res, next) => {
  if (!req.body.name && !req.body.budget) {
    res.status(400).json({ message: "missing account data" });
  } else if (!req.body.name || !req.body.budget) {
    res.status(400).json({ message: "name and budget are required" });
  } else {
    next();
  }
};

router.get("/", async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", validateAccountId, async (req, res) => {
  const { id } = req.params;

  try {
    const account = await Account.findById(id);
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", validateAccount, async (req, res) => {
  try {
    const newAccount = req.body;
    const createdAccount = await Account.create(newAccount);
    res.status(201).json(createdAccount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", validateAccountId, async (req, res) => {
  const { id } = req.params;

  try {
    const updates = req.body;
    const updatedAccount = await Account.update(id, updates);
    res.status(200).json(updatedAccount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", validateAccountId, async (req, res) => {
  const { id } = req.params;

  try {
    await Account.delete(id);
    res.status(200).json({ message: `Account at id ${id} deleted` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
