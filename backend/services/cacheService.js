const redis = require('../config/cache');

async function getCachedData(key, fetchFunction) {
  const cachedData = await redis.get(key);
  if (cachedData) return JSON.parse(cachedData);

  const freshData = await fetchFunction();
  await redis.set(key, JSON.stringify(freshData), 'EX', 3600);
  return freshData;
}

module.exports = { getCachedData };
