const request = require('supertest');
const app = require('../server');

describe('API Nodes', () => {
  it('GET /api/nodes should return nodes array', async () => {
    const res = await request(app).get('/api/nodes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/nodes/add with invalid data returns 400', async () => {
    const res = await request(app)
      .post('/api/nodes/add')
      .send({ id: 'test-node' }); // Données incomplètes
    expect(res.statusCode).toBe(400);
  });
});
