const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes")

const app = express();
app.use(bodyParser.json()); // deprecated, but used in Metropolia UAS courses.
app.use('/', routes);

//MongoDB connection, missing database connection URL
const mongoose = require('mongoose');
const mongoURL = '';
mongoose.connect(mongoURL, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});