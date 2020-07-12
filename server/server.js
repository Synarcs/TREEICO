"use strict";
// mainly used for 2 phase authentication
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
app.use((req, res, next) => {
  if (req.method == "DELETE" || req.method === "PUT") {
    res.redirect("/");
  }
  next();
});

app.use(
  session({
    secret: "dapp side server",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log("app is started");
});
