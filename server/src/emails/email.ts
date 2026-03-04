import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates"
import tranporter from "./nodemailer"

const SendVerficationEamil = async (sender: string, code: string) => {
    try {
        await tranporter.sendMail({
            from: process.env.EMAIL,
            to: sender,
            subject: "Verify Your Accound",
            html: VERIFICATION_EMAIL_TEMPLATE.replace(
                "{verificationCode}",
                code
            ),
        })
    } catch (error) {
        console.log("Error in send verification Email : " ,error)
        throw new Error(`Error in send verificaiton email ${error}`)
    }
}

const sendWelcomeEmail = async (email : string, name : string) => {
  const recipient = [{ email }];

  try {
    const response = await tranporter.sendMail({
      from : process.env.EMAIL,
      to : email,
      subject : "Welcome Email",
    });

    console.log("Welcome email sent successfully" , response)
  } catch (error) {
    console.log("Error in Sending Welcome email", error);
    throw new Error(`Error in sending Welcome email ${error}`);
  }
};

const sendPasswordResetEmail = async (email : string , resetURL : string) => {

  try {
    const response = await tranporter.sendMail({
      from : process.env.EMAIL,
      to : email,
      subject : "Reset Your Password",
      html : PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}" , resetURL),
    })
  } catch (error) {
    console.log("Error in Reset Password Email" , error)
    throw new Error(`Error in sending password reset email : ${error}`)
  }
}

const sendResetSuccessEmail = async (email : string) => {
   
  try {
    const response = await tranporter.sendMail({
      from : process.env.EMAIL,
      to : email,
      subject : "Password Reset Successfully",
      html : PASSWORD_RESET_SUCCESS_TEMPLATE,
    })

    console.log("Password Reset Email sent Successfully" , response)
  } catch (error) {
    console.log("Error in sendResetSuccessEmail" , error)
    throw new Error(`Error password reset sending email : ${error}`)
  }
}

export { SendVerficationEamil, sendWelcomeEmail , sendPasswordResetEmail , sendResetSuccessEmail };
