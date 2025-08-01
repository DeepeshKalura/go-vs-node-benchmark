const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/benchmark';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB...");
    const database = client.db('benchmark');
    const products = database.collection('products');

    // Check if data already exists
    const count = await products.countDocuments();
    if (count > 0) {
      console.log('Database already seeded. Exiting.');
      return;
    }

    console.log('Seeding database...');
    const docs = [];
    for (let i = 0; i < 5000; i++) {
      docs.push({
        name: `Product ${i}`,
        price: Math.floor(Math.random() * 1000) + 1,
        createdAt: new Date(),
      });
    }

    await products.insertMany(docs);
    console.log('Database seeded successfully with 5000 products.');

  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

run().catch(console.error);
