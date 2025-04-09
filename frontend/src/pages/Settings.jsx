import React, { useState } from 'react';

export default function Settings() {
  const [privacyMode, setPrivacyMode] = useState(false);

  const togglePrivacy = () => {
    fetch('/api/settings/privacy', {
      method: 'POST',
      body: JSON.stringify({ enabled: !privacyMode }),
      headers: { 'Content-Type': 'application/json' }
    }).then(() => setPrivacyMode(!privacyMode));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">⚙️ Paramètres</h2>
      <div className="bg-white p-4 rounded shadow space-y-4">
        <div>
          <label className="font-semibold">Mode Ultra Confidentiel :</label>
          <button
            onClick={togglePrivacy}
            className={`ml-4 px-4 py-1 rounded ${privacyMode ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
          >
            {privacyMode ? 'Désactiver' : 'Activer'}
          </button>
        </div>
        <div>
          <label className="font-semibold">Notifications configurées :</label>
          <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
            <li>Email : activé</li>
            <li>Telegram : activé</li>
            <li>WhatsApp : désactivé</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
