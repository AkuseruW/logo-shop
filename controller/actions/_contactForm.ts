'use server'
import { contactMail } from '@/utils/mail/contact_mail'


export const contactFormAction = async (data: { name: string, email: string, message: string, subject: string }) => {
    const { name, email, message, subject } = data
    await contactMail(name, email, message, subject)
    return { message: 'Email sent successfully' }
}
