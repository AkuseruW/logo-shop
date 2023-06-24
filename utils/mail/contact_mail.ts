const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function contactMail(name: string, email: string, subject: string, message: string) {
    const msg = {
        to: 'wolfs.axelw@gmail.com',
        from: email,
        templateId: "d-5213a44ca7ad4de1a51f872304042278",
        dynamic_template_data: {
            name,
            subject,
            message,
            email
        },
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);
    }
}
