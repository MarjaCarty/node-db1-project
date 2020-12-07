const express = require("express");
const AccountRouter = require("./accounts/account-router");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use("/api/accounts", AccountRouter);

server.get("/", (_, res) => {
  res.status(200).json({ message: "api up" });
});

module.exports = server;
