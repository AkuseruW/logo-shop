import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {


  // Return a JSON response with a success message
  return NextResponse.json({ message: `product created` }, { status: 200 });

}
