const nodemailer = require('../config/nodemailer');


exports.newComment = (comment) => {

    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs')
    nodemailer.transorter.sendMail({
        name: 'CodersConnect',
        from: 'contact@CodersConnect.in',
        to: comment.user.email,
        subject: "New Comment",
        html: htmlString
        // '<h1> yup, your comment is now published </h1>'
    }, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
        // console.log('message sent', info);
        return;

    });
}