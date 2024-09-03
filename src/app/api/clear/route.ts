import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Truncate the foods table
    await sql`TRUNCATE TABLE foods RESTART IDENTITY CASCADE;`;

    return NextResponse.json({ message: 'Table truncated successfully' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error in POST /api/truncate:', error);

    let errorMessage = 'An error occurred while truncating the table';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
