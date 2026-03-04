import nodemailer from "nodemailer"

const tranporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "24bcs147@iiitdwd.ac.in",
        pass : "dklbewsixvcwhhwz"
    }
})

export default tranporter;