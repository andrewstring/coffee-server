const express = require("express");
const { type } = require("express/lib/response");
const app = express();
const port = 3000;

//get all drinks
app.get("/:userId/:type/all", (req, res) => {});

//get single drink
app.get("/:userId/:type/:id", (req, res) => {});

//post drink to database
app.post("/:userId/:type/:id", (req, res) => {});

//update item
app.put("/:userId/:type/", (req, res) => {});

//delete item
app.delete("/:userId/:type/", (req, res) => {});
