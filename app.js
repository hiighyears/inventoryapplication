require("dotenv").config();
const express = require('express');
const app = express();
app.set("view engine", "ejs");
const routes = require('./routes/routes')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;


app.use('/',routes);
app.listen(PORT,()=> {
    console.log('server listening on 3000')
});