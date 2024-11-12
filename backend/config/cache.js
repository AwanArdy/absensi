const { default: Redis } = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDI_PORT
});

module.exports = redis;
