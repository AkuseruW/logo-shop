const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function resetPasswordMail(name: string, email: string, resetUrl: string) {
    const msg = {
        to: email,
        from: "noreply@logo.com",
        templateId: "d-8496ab6c50d6494eb8bbe2d90d4095e0",
        dynamic_template_data: {
            first_name: name,
            email,
            token: resetUrl
        },
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);
    }
}
