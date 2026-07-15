import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../config/api';

export function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.data ?? [];
        setEntries(items);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <ul className="list-group list-group-flush">
          {entries.map((entry) => (
            <li key={entry._id || entry.name} className="list-group-item px-0 d-flex justify-content-between">
              <span>{entry.name}</span>
              <strong>{entry.score}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
