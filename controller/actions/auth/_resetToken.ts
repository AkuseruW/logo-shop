'use server'

import bcrypt from 'bcrypt'
import { prisma } from "@/lib/prisma"
import { resetPasswordToken, verifyJwtPasswordReset } from '@/lib/jwt';
import { resetPasswordMail } from '@/utils/mail/resetPassword_mail';

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export async function resetTokenReqActions(data: RegisterData) {
    const { email } = data
    const user = await prisma.user.findUnique({ where: { email } })

    if (user) {
        const { id, email, name } = user
        const token = await resetPasswordToken(email as string)
        const resetUrl = `${process.env.BASE_URL}/reset-password/${encodeURIComponent(token)}`

        await prisma.resetPasswordToken.create({
            data: {
                userId: id,
                token,
                expires: new Date()
            },
            include: { user: true }
        })

        await resetPasswordMail(name as string, email as string, resetUrl as string)
    }

    return { message: 'An email has been sent to your address.' }
}


export async function resetTokenChangePasswordActions(data: { password: string }, token: string) {
    const { password } = data
    const tokendecoded = await verifyJwtPasswordReset(token);

    if (tokendecoded.expired) {
        return { error: "Token expired" }
    }

    const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
        where: { token },
        include: { user: true }
    });

    if (!resetPasswordToken || tokendecoded.expired != false) {
        return { error: "Invalid or expired token" };
    }

    const email = tokendecoded.decodedToken?.email;
    const user = resetPasswordToken.user;
    await prisma.$transaction([
        prisma.user.update({
            where: { email },
            data: {
                password: await bcrypt.hash(password, 12),
            },
        }),
        prisma.resetPasswordToken.deleteMany({
            where: { userId: { equals: user.id } },
        }),
    ]);

    if (user) {
        return { message: 'Password updated successfully' };
    }
}