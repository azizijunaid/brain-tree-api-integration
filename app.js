const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');

require('dotenv').config();
const port = 3000;

const corsOption = {
  origin: ['http://127.0.0.1:5500'],
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  exposedHeaders: [
    'Authorization',
    'Content-Type',
    'x-auth-token',
    'authorization',
  ],
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// Include app routes
app.use(require("./routes/index"));

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

module.exports = app;
