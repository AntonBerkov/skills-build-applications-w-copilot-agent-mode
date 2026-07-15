const assert = require('node:assert/strict');

async function main() {
  const endpoints = [
    '/api/users/',
    '/api/teams/',
    '/api/activities/',
    '/api/leaderboard/',
    '/api/workouts/',
  ];

  for (const endpoint of endpoints) {
    const response = await fetch('http://localhost:8000' + endpoint);
    assert.equal(response.status, 200, `${endpoint} should respond with 200`);
  }

  console.log('All API endpoints responded with 200 OK');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
