const express = require("express")
const fs = require("fs");
const cors = require("cors")
const path = require('path')
const port = 5000;

//Create HTTP server and listen on port 3000 for requests
const app = express()
app.use(cors())
app.use(express.json())

const publicRoutes = require('./routes.js')
app.use('/backend', publicRoutes);
//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
