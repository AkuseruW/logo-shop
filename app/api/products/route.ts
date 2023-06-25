import { prisma } from "@/lib/prisma";
import { Products } from "@prisma/client";
import { NextRequest, NextResponse } from 'next/server';

interface ProductWithoutMetadata extends Omit<Products, 'updatedAt' | 'createdAt'> { }

export async function GET(request: NextRequest): Promise<NextResponse> {

  const data = await prisma.products.findMany({
    orderBy: { createdAt: 'desc' },
  });

  if (!data) {
    return NextResponse.json({ message: 'No data found' }, { status: 404 });
  }

  const products: ProductWithoutMetadata[] = data.map(({ updatedAt, createdAt, ...rest }) => rest);

  prisma.$disconnect();

  return NextResponse.json({ products }, { status: 200 });
}