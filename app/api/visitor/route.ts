import { NextResponse } from 'next/server';

// Simple in-memory counter for demo; for production use Vercel KV
let totalCount = 1000;

export async function POST() {
  totalCount += 1;
  return NextResponse.json({ total: totalCount });
}

export async function GET() {
  return NextResponse.json({ total: totalCount });
}
