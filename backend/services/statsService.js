const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // 60s TTL

function getCachedNodes(fetchNodesFn) {
  const key = 'nodes';
  const cached = cache.get(key);
  if (cached) return cached;

  const fresh = fetchNodesFn();
  cache.set(key, fresh);
  return fresh;
}

module.exports = { getCachedNodes };
