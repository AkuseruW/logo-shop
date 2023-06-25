import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/next-auth";


export async function getCategoryBySlug(slug: string) {

    let category = await prisma.categories.findUnique({
        where: { slug: slug as string },
    });

    if (!category) {
        notFound();
    }


    await prisma.$disconnect();
    return { category };
}