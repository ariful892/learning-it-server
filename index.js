const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const { query } = require('express');

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kg1r8ze.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const courseCollection = client.db('learning_it').collection('courses');

        app.get('/course', async (req, res) => {
            const query = {};
            const cursor = courseCollection.find(query);
            const courses = await cursor.toArray();
            res.send(courses);
        })
    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello from Learning IT!')
})

app.listen(port, () => {
    console.log(`Learning IT app listening on port ${port}`)
})