const express = require("express");
const helmet = require("helmet");
const server = express();

const PORT = process.env.ENV_PORT || 8000;

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => res.status(200).json({ api: "running" }));

server.listen(PORT, _ => console.log("Listening on port " + PORT));

module.exports = server;
