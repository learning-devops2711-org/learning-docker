const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const app = express();

const redisClient = redis.createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` });
redisClient.connect();

mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', async (req, res) => {
  const value = await redisClient.get('key') || 'Hello, world!';
  res.send(value);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
docker-compose up
