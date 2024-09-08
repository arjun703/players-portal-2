export default function sendMail(to, subject, text, html){
    
    const formData = require('form-data');
    const Mailgun = require('mailgun.js');
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});
    
    mg.messages.create(process.env.MAILGUN_DOMAIN, {
        from: `SportsTalentAsia <mailgun@${process.env.MAILGUN_DOMAIN}>`,
        to: [to],
        subject: subject,
        text: text,
        html: html
    })

}
