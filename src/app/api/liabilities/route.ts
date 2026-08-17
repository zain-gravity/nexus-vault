import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { Liability } from '@/models/Liability';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const liabilities = await Liability.find({ userId: session.user.id }).sort({ isPaid: 1, createdAt: -1 });
    return NextResponse.json({ liabilities });
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
    const newLiability = await Liability.create({ ...body, userId: session.user.id });
    return NextResponse.json({ success: true, liability: newLiability }, { status: 201 });
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

    const updated = await Liability.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { $set: updateData },
      { new: true }
    );
    return NextResponse.json({ success: true, liability: updated });
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
    await Liability.findOneAndDelete({ _id: body.id, userId: session.user.id });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
