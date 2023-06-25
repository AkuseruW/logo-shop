'use server'

import bcrypt from 'bcrypt'
import { prisma } from "@/lib/prisma"


interface SessionProps {
    name: string,
    email: string,
    sub: string,
    id: string,
    role: string,
    iat: number,
    exp: number,
    jti: string
}

export const updatePasswordActions = async (currentPassword: string, newPassword: string, session: SessionProps) => {
    const { id: userId } = session

    if (!userId) {
        return { error: 'Missing authorization' }
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user || !user.password) {
        return { error: 'Invalid current password' }
    }
    
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
        return { error: 'Invalid current password' }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatePassword = await prisma.user.update({
        where: { id: userId },
        data: {
            password: hashedPassword,
        },
    });
    if (updatePassword) {
        return { message: 'Password updated successfully' }
    }
}
