
const express = require("express");
const { fetchTodos } = require("../Controller/todos.js");
const { createTodos } = require("../Controller/todos.js");

const router = express.Router();

router.get("/",fetchTodos)

router.post("/",createTodos)


module.exports = router
