import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

const cards = [
  { title: 'Activity logging', text: 'Record workouts and sync them with your daily streak.' },
  { title: 'Team management', text: 'Create groups, share progress, and challenge your friends.' },
  { title: 'Leaderboards', text: 'Stay motivated with real-time rankings and badges.' },
]

function App() {
  return (
    <div className="container py-5">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="text-uppercase text-primary fw-semibold mb-2">OctoFit Tracker</p>
          <h1 className="display-5 fw-bold">Modern fitness coaching for every team</h1>
        </div>
        <nav className="d-flex gap-3">
          <Link className="btn btn-outline-primary" to="/">Home</Link>
          <Link className="btn btn-primary" to="/dashboard">Dashboard</Link>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <section className="row g-4 align-items-stretch">
              <div className="col-lg-7">
                <div className="p-4 rounded-4 shadow-sm border bg-light h-100">
                  <h2 className="h3 mb-3">Track progress across every tier</h2>
                  <p className="text-muted mb-4">
                    OctoFit combines a React presentation layer, an Express API, and a MongoDB data service into one polished experience.
                  </p>
                  <div className="d-flex gap-2">
                    <Link className="btn btn-primary" to="/dashboard">Open dashboard</Link>
                    <a className="btn btn-outline-secondary" href="http://localhost:8000/api/health" target="_blank" rel="noreferrer">API health</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="p-4 rounded-4 border shadow-sm h-100">
                  <h2 className="h4 mb-3">What’s included</h2>
                  <ul className="list-group list-group-flush">
                    {cards.map((card) => (
                      <li key={card.title} className="list-group-item px-0">
                        <h3 className="h6 mb-1">{card.title}</h3>
                        <p className="text-muted mb-0">{card.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          }
        />
        <Route
          path="/dashboard"
          element={
            <section className="row g-4">
              <div className="col-md-6">
                <div className="p-4 rounded-4 border shadow-sm bg-white h-100">
                  <h2 className="h4 mb-3">Daily focus</h2>
                  <p className="text-muted">3 workouts planned • 1 team challenge active</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-4 rounded-4 border shadow-sm bg-white h-100">
                  <h2 className="h4 mb-3">Leaderboard snapshot</h2>
                  <p className="text-muted">Ava leads the sprint board with 94% consistency.</p>
                </div>
              </div>
            </section>
          }
        />
      </Routes>
    </div>
  )
}

export default App
