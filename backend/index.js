const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
require('dotenv').config()



app.use(express.json())

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: 'GET,PUT,PATCH,POST,DELETE'
}))









const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@backendtest.ldjqqhi.mongodb.net/?retryWrites=true&w=majority&appName=backendTest`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const db = client.db('ExploreRedux');
const addedData = db.collection('addedData');

async function run() {
  try {

    app.get('/data', async (req, res) => {
      const data = await addedData.find().toArray()
      return res.status(201).send(data)
    })
    
    app.post('/data', async (req, res) => {

        const data = req.body;

        if (!data || typeof data !== 'object') {
            return res.status(400).send('Invalid data');
        }

        try{
            await addedData.insertOne(data);
            return res.status(201).send({successMessage:'Data added successfully!'});
        } catch(err){
            console.error(err);
            return res.status(500).send({errorMessage:'Server Error'});
        }

    })

    app.put('/data/:id', async (req, res) => {
      const id = req.params.id;
      console.log('ID:', id);
      const updatedData = req.body;
      const query = { _id: new ObjectId(id) };
      console.log('Updated Data:', updatedData);
  
      try {
          // Check if the document exists
          const existingDoc = await addedData.findOne(query);
          console.log('Existing Document:', existingDoc);
  
          if (!existingDoc) {
              return res.status(404).send({ errorMessage: 'Document not found' });
          }
  
          const result = await addedData.updateOne(query, { $set: updatedData }, { upsert: true });
          console.log('Update Result:', result);
  
          if (result.modifiedCount > 0) {
              return res.status(200).send({ successMessage: 'Update successful' });
          } else {
              return res.status(200).send({ successMessage: 'No changes made' });
          }
      } catch (err) {
          console.error(err);
          return res.status(500).send({ errorMessage: 'Server Error' });
      }
  });
  

    app.delete('/data/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id)}
      const result = addedData.deleteOne(query)
      return res.status(201).send({message: 'Delete successful'})
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}


run().catch(console.dir);














app.get('/', (req, res) => {
  res.send('Hello I am just testing the redux.js!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})