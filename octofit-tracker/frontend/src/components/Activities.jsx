import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../config/api';

export function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.data ?? [];
        setActivities(items);
      } catch (err) {
        setError(err.message || 'Unable to load activities.');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        <ul className="list-group list-group-flush">
          {activities.map((activity) => (
            <li key={activity._id || activity.type} className="list-group-item px-0">
              <strong>{activity.type}</strong> • {activity.durationMinutes} mins
              <div className="small text-muted">{activity.caloriesBurned} kcal</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
