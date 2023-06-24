'use server'

import bcrypt from 'bcrypt'
import { prisma } from "@/lib/prisma"
import { registered } from '@/utils/mail/registration_mail'

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export async function registerActions(data: RegisterData) {
    const { name, email, password } = data

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        return { error: 'User is already registered' }
    }

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: await bcrypt.hash(password, 12),
        },
    })

    if (newUser) {
        await registered(name, email)
        return { success: 'Account created' }
    }
}