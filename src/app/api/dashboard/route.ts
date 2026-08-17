import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { aggregateDashboardData } from '@/services/dashboard-aggregator';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dashboardData = await aggregateDashboardData(session.user.id);
    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
