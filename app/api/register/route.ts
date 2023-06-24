import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { registered } from '@/utils/mail/registration_mail'


export async function POST(request: Request) {
    const { name, email, password } = await request.json();
    const existingUser = await prisma.user.findUnique({ where: { email } });
    
    if (existingUser) {
        return NextResponse.json({ message: 'User is already registered' }, { status: 422 })
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: await bcrypt.hash(password, 12),
        },
    })

    await registered(name, email)

    prisma.$disconnect()
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
}
