const request = require('supertest');
const app = require('../server');
const fs = require('fs');
const path = require('path');

describe('API Reports', () => {
  it('POST /api/reports/generate (weekly) should return a filename', async () => {
    const res = await request(app)
      .post('/api/reports/generate')
      .send({ type: 'weekly' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('file');
    expect(res.body.file).toMatch(/weekly-report/);
  });

  afterAll(() => {
    // Nettoyage des fichiers générés
    const dir = path.join(__dirname, '../../report/weekly');
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach(file => {
        if (file.startsWith('weekly-report')) {
          fs.unlinkSync(path.join(dir, file));
        }
      });
    }
  });
});
