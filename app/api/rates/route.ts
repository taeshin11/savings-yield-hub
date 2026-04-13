import { NextResponse } from 'next/server';
import { getAllBanks } from '@/lib/banks';

export async function GET() {
  const banks = await getAllBanks();
  return NextResponse.json({ banks, updatedAt: new Date().toISOString() });
}
