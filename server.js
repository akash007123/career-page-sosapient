require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST Route for Form Submission
app.post("/submit-form", async (req, res) => {
    const { name, email, mobile, experience, job_position, resume } = req.body;

    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,  // Your Email
            pass: process.env.EMAIL_PASS,  // App Password
        },
    });

    // Email to Candidate
    const mailToCandidate = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Application Received - Thank You!",
        html: `<p>Dear ${name},</p>
               <p>Thank you for applying for the ${job_position} position. Our team will review your application.</p>
               <p>Best Regards,<br>Company HR Team</p>`,
    };

    // Email to Recruiter
    const mailToRecruiter = {
        from: process.env.EMAIL_USER,
        to: process.env.RECRUITER_EMAIL, // Replace with recruiter email
        subject: `New Job Application: ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Mobile:</strong> ${mobile}</p>
               <p><strong>Experience:</strong> ${experience} years</p>
               <p><strong>Job Position:</strong> ${job_position}</p>
               <p><strong>Resume Link:</strong> <a href="${resume}" target="_blank">${resume}</a></p>`,
    };

    try {
        await transporter.sendMail(mailToCandidate);
        await transporter.sendMail(mailToRecruiter);
        res.json({ success: true, message: "Emails sent successfully!" });
    } catch (error) {
        console.error("Email Error:", error);
        res.json({ success: false, message: "Email sending failed!" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
