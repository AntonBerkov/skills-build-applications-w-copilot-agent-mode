"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
const createCollectionResponse = (collection, payload) => ({
    collection,
    message: `${collection} endpoint ready`,
    baseUrl,
    data: payload,
});
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});
app.get('/api', (_req, res) => {
    res.json({ message: 'OctoFit Tracker API is ready', baseUrl });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await models_1.UserModel.find().lean();
    res.json(createCollectionResponse('users', users));
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await models_1.TeamModel.find().lean();
    res.json(createCollectionResponse('teams', teams));
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await models_1.ActivityModel.find().lean();
    res.json(createCollectionResponse('activities', activities));
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntryModel.find().sort({ score: -1 }).lean();
    res.json(createCollectionResponse('leaderboard', leaderboard));
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await models_1.WorkoutModel.find().lean();
    res.json(createCollectionResponse('workouts', workouts));
});
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB');
        app.listen(port, '0.0.0.0', () => {
            console.log(`Backend listening on port ${port}`);
            console.log(`API base URL: ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
}
startServer();
