import { NextResponse } from 'next/server';
import { getLowStockItems } from '@/lib/api';

export async function GET() {
  try {
    const items = await getLowStockItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching low stock items:', error);
    return NextResponse.json({ error: 'Failed to fetch low stock items' }, { status: 500 });
  }
}
