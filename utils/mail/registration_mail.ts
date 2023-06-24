const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function registered(name: string, email: string) {
  const msg = {
    to: email,
    from: "noreply@logo.com",
    templateId: "d-7d38db45ab37490bbfb91cd41390ba75",
    dynamic_template_data: {
      full_name: name,
    },
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error("Erreur lors de l'envoi du mail: ", error);
  }
}
