import React, { useState } from 'react';
import axios from 'axios';

export default function Reports() {
  const [type, setType] = useState('weekly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportFile, setReportFile] = useState(null);

  const generate = async () => {
    const res = await axios.post('/api/reports/generate', {
      type,
      startDate,
      endDate
    });
    if (res.data && res.data.file) {
      setReportFile(`/report/${type}/${res.data.file}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📄 Générer un rapport</h2>
      <div className="bg-white p-4 rounded shadow space-y-4">
        <div>
          <label className="font-semibold">Type de rapport :</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="ml-2 border rounded p-1"
          >
            <option value="weekly">Hebdomadaire</option>
            <option value="monthly">Mensuel</option>
            <option value="custom">Personnalisé</option>
          </select>
        </div>

        {type === 'custom' && (
          <div className="flex gap-4">
            <div>
              <label>Du :</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border rounded p-1 ml-2" />
            </div>
            <div>
              <label>Au :</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border rounded p-1 ml-2" />
            </div>
          </div>
        )}

        <button
          onClick={generate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Générer le rapport
        </button>

        {reportFile && (
          <div className="mt-4">
            ✅ Rapport généré :{' '}
            <a href={reportFile} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              Voir le rapport
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
