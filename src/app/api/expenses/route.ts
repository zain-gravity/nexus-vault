import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { Expense } from '@/models/Expense';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const expenses = await Expense.find({ userId: session.user.id }).sort({ amount: -1 });
    return NextResponse.json({ expenses });
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
    const newExpense = await Expense.create({ ...body, userId: session.user.id });
    return NextResponse.json({ success: true, expense: newExpense }, { status: 201 });
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

    const updated = await Expense.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { $set: updateData },
      { new: true }
    );
    return NextResponse.json({ success: true, expense: updated });
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
    await Expense.findOneAndDelete({ _id: body.id, userId: session.user.id });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
