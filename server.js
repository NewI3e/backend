import express from 'express';
import dotenv from 'dotenv'
import { connectToMongoDB } from './src/config/db.js';

import { productsRouter } from './src/router/productRoute.js';

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
// Connect to MongoDB before starting the server
await connectToMongoDB();


app.use('/api/v1/products', productsRouter);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});