export default function sendMail(to, subject, text, html){
    
    const formData = require('form-data');
    const Mailgun = require('mailgun.js');
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'bdd0b712691064d3b3715a6c9ce79026-777a617d-a0bc3518'});
    
    mg.messages.create('sandbox0b2c0893e1334bba8f45e273a7049763.mailgun.org', {
        from: "SportsTalentAsia <mailgun@sandbox0b2c0893e1334bba8f45e273a7049763.mailgun.org>",
        to: [to],
        subject: subject,
        text: text,
        html: html
    })

}
