import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../config/api';

export function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.data ?? [];
        setTeams(items);
      } catch (err) {
        setError(err.message || 'Unable to load teams.');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        <ul className="list-group list-group-flush">
          {teams.map((team) => (
            <li key={team._id || team.name} className="list-group-item px-0">
              <strong>{team.name}</strong>
              <div className="small text-muted">{team.sport} • {team.weeklyGoal}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
