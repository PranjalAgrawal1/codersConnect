const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path')
const crediantials = require('../passwords/gmail_pass');


let transorter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: crediantials.username,
        pass: crediantials.password
    }
})


let renderTemplate = (data, relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log(err);
                return;
            }
            mailHtml = template;
        }
    )

    return mailHtml;

}


module.exports = {
    transorter: transorter,
    renderTemplate: renderTemplate
}