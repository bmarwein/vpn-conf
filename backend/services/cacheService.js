const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // TTL = 60 secondes

function getOrSetCache(key, fetchFunction) {
  const value = cache.get(key);
  if (value) return value;

  const result = fetchFunction();
  cache.set(key, result);
  return result;
}

module.exports = { getOrSetCache };
