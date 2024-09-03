import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
      const { name, qty } = await request.json();
  
      if (qty <= 0) {
        // Delete the food item from the database if quantity is 0 or less
        await sql`
          DELETE FROM foods
          WHERE name = ${name};
        `;
      } else {
        // Insert new food item or update existing one
        await sql`
          INSERT INTO foods (name, qty)
          VALUES (${name}, ${qty})
          ON CONFLICT (name) 
          DO UPDATE SET qty = foods.qty + EXCLUDED.qty;
        `;
      }
  
      return NextResponse.json({ message: 'Food item processed successfully' }, { status: 200 });
    } catch (error: unknown) {
      console.error('Error in POST /api/foods:', error);
  
      let errorMessage = 'An error occurred while processing the food item';
  
      if (error instanceof Error) {
        errorMessage = error.message;
      }
  
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

export async function GET() {
    try {
        const result = await sql`
        SELECT * FROM foods;
        `;

        return NextResponse.json({ foods: result.rows }, { status: 200 });
    } catch (error: unknown) {
        let errorMessage = 'An unexpected error occurred';

        // Check if the error is an instance of Error to safely access the message
        if (error instanceof Error) {
        errorMessage = error.message;
        }

        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
} 