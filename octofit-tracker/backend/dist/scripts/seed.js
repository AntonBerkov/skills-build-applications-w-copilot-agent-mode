"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            models_1.UserModel.deleteMany({}),
            models_1.TeamModel.deleteMany({}),
            models_1.ActivityModel.deleteMany({}),
            models_1.LeaderboardEntryModel.deleteMany({}),
            models_1.WorkoutModel.deleteMany({}),
        ]);
        const users = await models_1.UserModel.insertMany([
            { name: 'Ava Chen', email: 'ava@example.com', role: 'captain', fitnessGoal: 'Build endurance' },
            { name: 'Mateo Ruiz', email: 'mateo@example.com', role: 'member', fitnessGoal: 'Lose 5kg' },
            { name: 'Nia Brooks', email: 'nia@example.com', role: 'coach', fitnessGoal: 'Improve mobility' },
        ]);
        await models_1.TeamModel.insertMany([
            { name: 'Velocity Squad', sport: 'Running', members: users.map((user) => user.name), weeklyGoal: 'Complete 4 group runs' },
            { name: 'Core Collective', sport: 'CrossFit', members: [users[0].name, users[2].name], weeklyGoal: 'Hit 3 strength sessions' },
        ]);
        await models_1.ActivityModel.insertMany([
            { userId: users[0]._id.toString(), type: 'run', durationMinutes: 35, caloriesBurned: 420, date: new Date('2026-07-14') },
            { userId: users[1]._id.toString(), type: 'strength', durationMinutes: 50, caloriesBurned: 480, date: new Date('2026-07-15') },
            { userId: users[2]._id.toString(), type: 'mobility', durationMinutes: 25, caloriesBurned: 180, date: new Date('2026-07-15') },
        ]);
        await models_1.LeaderboardEntryModel.insertMany([
            { userId: users[0]._id.toString(), name: users[0].name, score: 980, streak: 12 },
            { userId: users[1]._id.toString(), name: users[1].name, score: 912, streak: 7 },
            { userId: users[2]._id.toString(), name: users[2].name, score: 895, streak: 10 },
        ]);
        await models_1.WorkoutModel.insertMany([
            { name: 'Tempo Run', focus: 'endurance', durationMinutes: 35, difficulty: 'moderate' },
            { name: 'Power Circuit', focus: 'strength', durationMinutes: 45, difficulty: 'hard' },
            { name: 'Recovery Flow', focus: 'mobility', durationMinutes: 20, difficulty: 'easy' },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
