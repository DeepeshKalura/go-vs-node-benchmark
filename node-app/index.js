
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/benchmark';
const client = new MongoClient(uri);

let db;

async function connectToDb() {
    try {
        await client.connect();
        db = client.db('benchmark');
        console.log("Node.js App connected to MongoDB successfully.");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); // Exit if DB connection fails on start
    }
}

app.get('/products', async (req, res) => {
    try {
        const productsCollection = db.collection('products');
        // As per the spec, fetch the first 200 documents
        const products = await productsCollection.find({}).limit(200).toArray();
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send('Internal Server Error');
    }
});

connectToDb().then(() => {
    app.listen(port, () => {
        console.log(`Node.js app listening on port ${port}`);
    });
});


