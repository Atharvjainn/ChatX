import { Resend } from 'resend';
import { getWelcomeEmailTemplate } from './EmailTemplate.js'
import { EMAIL_FROM,EMAIL_FROM_NAME } from '../config/serverConfig.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomemail = async(email,name,clientURL) => {
    try {
        const { data,error } = await resend.emails.send({
            from : ` ${EMAIL_FROM_NAME} <${EMAIL_FROM}> `,
            to : email,
            subject : "Welcome to Chatify!",
            html : getWelcomeEmailTemplate(name,clientURL)
        })

        if(error){
            console.log("cannot send email",error.message);
            throw new Error("Failed to send email")
        }

        console.log(data)

    } catch (error) {
        console.log("Unable to send welcome email");
        throw new Error("Failed to send email")
    }
}