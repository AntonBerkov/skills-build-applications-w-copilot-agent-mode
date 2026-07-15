import { Link, Route, Routes } from 'react-router-dom';
import { Activities } from './components/Activities';
import { Leaderboard } from './components/Leaderboard';
import { Teams } from './components/Teams';
import { Users } from './components/Users';
import { Workouts } from './components/Workouts';
import './App.css';

function App() {
  return (
    <div className="container py-5">
      <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <p className="text-uppercase text-primary fw-semibold mb-2">OctoFit Tracker</p>
          <h1 className="display-5 fw-bold">Modern fitness coaching for every team</h1>
          <p className="text-muted mt-2">
            Configure <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use Codespaces URLs. If it is unset, the app falls back to localhost.
          </p>
        </div>
        <nav className="d-flex flex-wrap gap-2">
          <Link className="btn btn-outline-primary" to="/">Home</Link>
          <Link className="btn btn-outline-primary" to="/users">Users</Link>
          <Link className="btn btn-outline-primary" to="/teams">Teams</Link>
          <Link className="btn btn-outline-primary" to="/activities">Activities</Link>
          <Link className="btn btn-outline-primary" to="/leaderboard">Leaderboard</Link>
          <Link className="btn btn-primary" to="/workouts">Workouts</Link>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <section className="row g-4">
              <div className="col-lg-7">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body">
                    <h2 className="h3 mb-3">Track progress across every tier</h2>
                    <p className="text-muted">
                      The React frontend now pulls data from the Express API for users, teams, activities, leaderboard, and workouts.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body">
                    <h2 className="h4 mb-3">Quick links</h2>
                    <div className="d-grid gap-2">
                      <Link className="btn btn-outline-primary" to="/users">View users</Link>
                      <Link className="btn btn-outline-primary" to="/teams">View teams</Link>
                      <Link className="btn btn-outline-primary" to="/leaderboard">View leaderboard</Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
