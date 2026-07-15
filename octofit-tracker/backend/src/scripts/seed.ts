import mongoose from 'mongoose';
import { ActivityModel, LeaderboardEntryModel, TeamModel, UserModel, WorkoutModel } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardEntryModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.insertMany([
      { name: 'Ava Chen', email: 'ava@example.com', role: 'captain', fitnessGoal: 'Build endurance' },
      { name: 'Mateo Ruiz', email: 'mateo@example.com', role: 'member', fitnessGoal: 'Lose 5kg' },
      { name: 'Nia Brooks', email: 'nia@example.com', role: 'coach', fitnessGoal: 'Improve mobility' },
    ]);

    await TeamModel.insertMany([
      { name: 'Velocity Squad', sport: 'Running', members: users.map((user) => user.name), weeklyGoal: 'Complete 4 group runs' },
      { name: 'Core Collective', sport: 'CrossFit', members: [users[0].name, users[2].name], weeklyGoal: 'Hit 3 strength sessions' },
    ]);

    await ActivityModel.insertMany([
      { userId: users[0]._id.toString(), type: 'run', durationMinutes: 35, caloriesBurned: 420, date: new Date('2026-07-14') },
      { userId: users[1]._id.toString(), type: 'strength', durationMinutes: 50, caloriesBurned: 480, date: new Date('2026-07-15') },
      { userId: users[2]._id.toString(), type: 'mobility', durationMinutes: 25, caloriesBurned: 180, date: new Date('2026-07-15') },
    ]);

    await LeaderboardEntryModel.insertMany([
      { userId: users[0]._id.toString(), name: users[0].name, score: 980, streak: 12 },
      { userId: users[1]._id.toString(), name: users[1].name, score: 912, streak: 7 },
      { userId: users[2]._id.toString(), name: users[2].name, score: 895, streak: 10 },
    ]);

    await WorkoutModel.insertMany([
      { name: 'Tempo Run', focus: 'endurance', durationMinutes: 35, difficulty: 'moderate' },
      { name: 'Power Circuit', focus: 'strength', durationMinutes: 45, difficulty: 'hard' },
      { name: 'Recovery Flow', focus: 'mobility', durationMinutes: 20, difficulty: 'easy' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
