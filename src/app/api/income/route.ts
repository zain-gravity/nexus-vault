import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { BusinessStream } from '@/models/BusinessStream';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const streams = await BusinessStream.find({ userId: session.user.id }).sort({ createdAt: -1 });
    return NextResponse.json({ streams });
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
    const newStream = await BusinessStream.create({ ...body, userId: session.user.id });
    return NextResponse.json({ success: true, stream: newStream }, { status: 201 });
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
    
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const updated = await BusinessStream.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { $set: updateData },
      { new: true }
    );
    return NextResponse.json({ success: true, stream: updated });
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
    if (!body.id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await BusinessStream.findOneAndDelete({ _id: body.id, userId: session.user.id });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
