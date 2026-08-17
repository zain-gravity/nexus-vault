import mongoose, { Document, Model, Schema } from 'mongoose';
import { ExpenseCategory, ExpenseFrequency } from '@/types/finance';

export interface IExpense extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  category: ExpenseCategory;
  amount: number;
  frequency: ExpenseFrequency;
  date: Date;
  isRecurring: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new Schema<IExpense>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['household', 'personal', 'business', 'subscription', 'utility', 'other'] 
  },
  amount: { type: Number, required: true },
  frequency: { 
    type: String, 
    required: true, 
    enum: ['daily', 'weekly', 'monthly', 'yearly', 'one_time'] 
  },
  date: { type: Date, required: true },
  isRecurring: { type: Boolean, default: false }
}, { 
  timestamps: true 
});

export const Expense: Model<IExpense> = mongoose.models.Expense || mongoose.model<IExpense>('Expense', expenseSchema);
