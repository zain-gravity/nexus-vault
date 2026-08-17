import mongoose, { Document, Model, Schema } from 'mongoose';
import { GoalType } from '@/types/finance';

export interface IFinancialGoal extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  type: GoalType;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  timeframeDays: number;
  createdAt: Date;
  updatedAt: Date;
}

const financialGoalSchema = new Schema<IFinancialGoal>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['debt_elimination', 'savings', 'investment_target', 'income_target'] 
  },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  deadline: { type: Date, required: true },
  timeframeDays: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
}, { 
  timestamps: true 
});

export const FinancialGoal: Model<IFinancialGoal> = mongoose.models.FinancialGoal || mongoose.model<IFinancialGoal>('FinancialGoal', financialGoalSchema);
