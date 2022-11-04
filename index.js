
const express = require('express')
const app = express()
const cors = require('cors');
const port =process.env.PORT || 5000;
require('dotenv').config();

// middelwere
app.use(cors());
app.use(express.json());

// MONGODB

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.apqupzl.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




app.get('/', (req, res) => {
  res.send('Hellow Ema jhon server!')
})

app.listen(port, () => {
  console.log(`how are you emajohn port ${port}`)
})