// Server for contact form
require('dotenv').config();


console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 1111;

//Parse data
app.use(express.urlencoded({ extended: true}));

//POST form submission
app.post('/submit', async (req, res) => {
    const{ name, email, message } = req.body;

    // Validating form is filled out
    if(!name || !email || !message){
        return res.status(400).send('All fields are required!');
    }

    //Nodemailer transportation
    const transporter =  nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls:{
            rejectUnauthorized: true //Ensure encryption
        }
    });

    //Set up email options
    const mailOptions = {
    from: email,
    to: 'leebritton98@gmail.com',
    subject: `New Contact Form Submission from ${name}`,  // Use backticks for interpolation
    text: `You have a new message from ${name} (${email}):\n\n${message}`  // Use backticks for interpolation
    };


    try{
        await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending message.');
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});