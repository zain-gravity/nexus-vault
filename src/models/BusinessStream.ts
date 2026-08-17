import mongoose, { Document, Model, Schema } from 'mongoose';
import { BusinessType } from '@/types/finance';

export interface IRevenue {
  amount: number;
  date: Date;
  note?: string;
}

export interface IBusinessStream extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  type: BusinessType;
  isActive: boolean;
  initialInvestment: number;
  currentValue: number;
  revenue: IRevenue[];
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const revenueSchema = new Schema<IRevenue>({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  note: { type: String }
}, { _id: false });

const businessStreamSchema = new Schema<IBusinessStream>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true },
  description: { type: String },
  type: { 
    type: String, 
    required: true, 
    enum: ['trading', 'freelance', 'business', 'investment', 'salary', 'other'] 
  },
  isActive: { type: Boolean, default: true },
  initialInvestment: { type: Number, default: 0 },
  currentValue: { type: Number, default: 0 },
  revenue: { type: [revenueSchema], default: [] },
  startDate: { type: Date, required: true },
  endDate: { type: Date }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export const BusinessStream: Model<IBusinessStream> = mongoose.models.BusinessStream || mongoose.model<IBusinessStream>('BusinessStream', businessStreamSchema);
