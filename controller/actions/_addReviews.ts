'use server'
import { prisma } from "@/lib/prisma";

interface ReviewData {
    comment: string;
    rating: string | number;
    session: {
        id: string;
    };
    product: {
        id: string;
    };
}

export const addReviewAction = async (data: ReviewData) => {
    const { comment, rating, session, product } = data;
    const { id: sessionId } = session;
    const { id: productId } = product;

    const existingReview = await prisma.review.findFirst({
        where: {
            authorId: sessionId,
            productId: productId,
        },
    });

    if (existingReview) {
        return { error: 'You have already posted a review for this product.' };
    }

    await prisma.review.create({
        data: {
            text: comment,
            rating: rating as number,
            authorId: sessionId,
            productId: productId,
        },
    });

    return { message: 'Thank you for your review 😊👌' };
};