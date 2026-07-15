import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../config/api';

export function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.data ?? [];
        setWorkouts(items);
      } catch (err) {
        setError(err.message || 'Unable to load workouts.');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        <ul className="list-group list-group-flush">
          {workouts.map((workout) => (
            <li key={workout._id || workout.name} className="list-group-item px-0">
              <strong>{workout.name}</strong> • {workout.focus}
              <div className="small text-muted">{workout.durationMinutes} mins • {workout.difficulty}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
