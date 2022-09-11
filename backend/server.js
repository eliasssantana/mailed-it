const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mg = require('mailgun-js');

dotenv.config()

const mailgun = () => mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cors())

app.post("/api/email", (req,res) => {
    const { email, subject, message } = req.body;
    mailgun().messages().send({
        from: "John Doe <canacob118@nicoimg.com>",
        to: `${email}`,
        subject: `${subject}`,
        html: `<p>${message}</p>`
    }, (error, body) => {
        if(error){
            console.log(error);
            res.status(500).send({ message: "Error in sending email"})
        }else{
            console.log(body);
            res.send({ message: "Email sent successfully"})
        }
    })
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`server at http://localhost:${PORT}`)
})