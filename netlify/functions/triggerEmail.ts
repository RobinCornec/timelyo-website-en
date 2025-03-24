import type { Handler } from "@netlify/functions";
import sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handler: Handler = async function(event) {
    if (event.body === null) {
        return {
            statusCode: 400,
            body: JSON.stringify("Payload required"),
        };
    }
    console.log('bbb');

    const requestBody = JSON.parse(event.body) as {
        formEmail: string;
        formName: string;
        formBusiness: string;
        formMessage: string;
    };

    try {
        await sgMail.send({
            from: 'contact@timelyo.com',
            to: 'contact@timelyo.com',
            subject: 'Timelyo - Nouveau contact',
            html: `
        <h1>Nouveau contact</h1>
        <p>Nom: ${requestBody.formName}</p>
        <p>Entreprise: ${requestBody.formBusiness}</p>
        <p>Email: ${requestBody.formEmail}</p>
        <p>${requestBody.formMessage}</p>
      `,
        });
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully!' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

export { handler };
