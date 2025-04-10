const alerts = require('../../logs/alerts.json');

describe('Format du fichier alerts.json', () => {
  it('doit être un tableau non vide', () => {
    expect(Array.isArray(alerts)).toBe(true);
    expect(alerts.length).toBeGreaterThan(0);
  });

  it('chaque alerte doit contenir un timestamp et un message', () => {
    alerts.forEach(alert => {
      expect(alert).toHaveProperty('timestamp');
      expect(alert).toHaveProperty('message');
    });
  });
});
