import { useRouter, useSearchParams } from "next/navigation";
import { prisma } from "@/lib/prisma";


export async function GetProducts() {
    const products = await prisma.products.findMany()

    return { products }
}

export async function GetLastedProducts() {
    const products = await prisma.products.findMany({
        where: { publish: true },
        orderBy: { createdAt: 'desc' },
        take: 4,
    })

    prisma.$disconnect()
    return { products }
}