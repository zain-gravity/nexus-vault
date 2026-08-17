import mongoose, { Document, Model, Schema } from 'mongoose';
import { LiabilityType } from '@/types/finance';

export interface ILiability extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  type: LiabilityType;
  totalAmount: number;
  remainingAmount: number;
  monthlyPayment: number;
  interestRate: number;
  startDate: Date;
  endDate?: Date;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const liabilitySchema = new Schema<ILiability>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['loan', 'emi', 'credit_card', 'mortgage', 'other'] 
  },
  totalAmount: { type: Number, required: true },
  remainingAmount: { type: Number, required: true },
  monthlyPayment: { type: Number, required: true },
  interestRate: { type: Number, default: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  isPaid: { type: Boolean, default: false }
}, { 
  timestamps: true 
});

export const Liability: Model<ILiability> = mongoose.models.Liability || mongoose.model<ILiability>('Liability', liabilitySchema);
