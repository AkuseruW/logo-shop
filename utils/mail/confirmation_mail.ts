const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendConfirmationMail (name: string, email: string) {
    const msg = {
        to: email,
        from: "noreply@logo.com",
        templateId: "d-495ab0464a0a4fc89400b2560cfc9b17",
        dynamic_template_data: {
            first_name: name,
            email
        },
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);
    }
}
