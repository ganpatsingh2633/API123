const express = require('express');
const connectDB = require('./server/connection');
require("dotenv").config();
const path = require('path');
const cors = require("cors");


const app = express();
const PORT = process.env.PORT ||  5000;

app.use(express.json());
app.use(cors());

const loginUser = require('./routes/loginRoutes');
const registerUser = require('./routes/registerroute'); // for register api....
const stoneProduct = require('./routes/productroutes'); // for  stone crusher.....
const qouteFrom = require('./routes/qouteRoute');
const teamList = require('./routes/stoneTeamRoute');


app.get('/', (req, res) => {
  res.send('Welcome to Bholenath Stone Crusher API');
});

app.use("/api/user",loginUser);
app.use("/api/user/register",registerUser);
app.use("/api/stone/product",stoneProduct);
app.use("/api/stone/quote",qouteFrom);
app.use("/api/stone/team",teamList);

connectDB();

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
