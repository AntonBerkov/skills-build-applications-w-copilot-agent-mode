import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../config/api';

export function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.data ?? [];
        setUsers(items);
      } catch (err) {
        setError(err.message || 'Unable to load users.');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        <ul className="list-group list-group-flush">
          {users.map((user) => (
            <li key={user._id || user.email} className="list-group-item px-0">
              <strong>{user.name}</strong> <span className="text-muted">({user.role})</span>
              <div className="small text-muted">{user.email}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
