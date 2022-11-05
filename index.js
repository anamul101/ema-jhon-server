
const express = require('express')
const app = express()
const cors = require('cors');
const port =process.env.PORT || 5000;
require('dotenv').config();

// middelwere
app.use(cors());
app.use(express.json());

// MONGODB

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.apqupzl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const productsCollection = client.db('emajhondb').collection('products');
        app.get('/products', async(req,res)=>{
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            console.log(page,size)
            const query = {};
            const cursor= productsCollection.find(query);
            const products = await cursor.skip(page * size).limit(size).toArray();
            const count = await productsCollection.estimatedDocumentCount(cursor)
            res.send({count ,products})
        });
        app.post('/productsByIds', async(req, res)=>{
          const ids = req.body;
          const objectId = ids.map(id=> ObjectId(id))
          const query = {_id: {$in: objectId}};
          const cursor = productsCollection.find(query);
          const products = await cursor.toArray();
          res.send(products)
        })
    }
    finally{

    }
}
run().catch(error=>console.error(error))


app.get('/', (req, res) => {
  res.send('Hellow Ema jhon server!')
})

app.listen(port, () => {
  console.log(`how are you emajohn port ${port}`)
})