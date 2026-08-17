import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { FinancialGoal } from '@/models/FinancialGoal';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const goals = await FinancialGoal.find({ userId: session.user.id }).sort({ deadline: 1 });
    return NextResponse.json({ goals });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    
    // Calculate timeframeDays if deadline is provided
    let timeframeDays = body.timeframeDays;
    if (body.deadline && !timeframeDays) {
      const diff = new Date(body.deadline).getTime() - new Date().getTime();
      timeframeDays = Math.ceil(diff / (1000 * 3600 * 24));
    }

    const newGoal = await FinancialGoal.create({ 
      ...body, 
      userId: session.user.id,
      timeframeDays: timeframeDays || 365
    });
    
    return NextResponse.json({ success: true, goal: newGoal }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await dbConnect();
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { id, ...updateData } = body;

    const updated = await FinancialGoal.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { $set: updateData },
      { new: true }
    );
    return NextResponse.json({ success: true, goal: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    await FinancialGoal.findOneAndDelete({ _id: body.id, userId: session.user.id });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
