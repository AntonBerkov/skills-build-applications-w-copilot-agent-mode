import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  fitnessGoal: string;
}

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: string[];
  weeklyGoal: string;
}

export interface IActivity extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

export interface ILeaderboardEntry extends Document {
  userId: string;
  name: string;
  score: number;
  streak: number;
}

export interface IWorkout extends Document {
  name: string;
  focus: string;
  durationMinutes: number;
  difficulty: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  fitnessGoal: { type: String, required: true },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: { type: [String], required: true },
  weeklyGoal: { type: String, required: true },
});

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  streak: { type: Number, required: true },
});

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
});

export const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export const TeamModel: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);
export const ActivityModel: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntryModel: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
export const WorkoutModel: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);
