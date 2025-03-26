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
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9;">
            <div style="text-align: center; padding-bottom: 20px;">
                <img src="https://sosapient.in/logo/Dlogo.png" alt="Company Logo" style="max-width: 150px;">
            </div>
            <div style="background: #ffffff; padding: 20px; border-radius: 8px;">
                <p style="font-size: 16px; color: #333;">Dear <strong>${name}</strong>,</p>
                <p style="font-size: 16px; color: #555;">Thank you for applying for the <strong>${job_position}</strong> position at our company. Our team is currently reviewing your application, and we will get back to you shortly.</p>
                <p style="font-size: 16px; color: #555;">If you have any questions in the meantime, feel free to reach out.</p>
                <p style="font-size: 16px; color: #555;">Best Regards,</p>
                <p style="font-size: 14px; color: #333;"><strong>Ritu Chouhan</strong></p>
                <p style="font-size: 12px; color: #333;"><strong>HR HEAD OPERATION</strong></p>
                <img src="https://ci3.googleusercontent.com/meips/ADKq_NavNUA9KRmZ8hWpd_ITBmoLjIXscuVqnn3VgfrlnSiDzgv_hpQRLiYmx15bNJaVVIJMAi2wpd24vQ=s0-d-e1-ft#https://sosapient.in/logo/Dlogo.png" alt="HR Team Signature" style="max-width: 200px; padding-top: 10px;">
            </div>
            <div style="text-align: center; margin-top: 20px; font-size: 14px; color: #666;">
                <p>📞 <a href="tel:+919685533878" style="color: #0073e6; text-decoration: none;">+91-9685533878</a> | 📧 <a href="mailto:akashraikwar763@gmail.com" style="color: #0073e6; text-decoration: none;">akashraikwar763@gmail.com</a></p>
                <p>🌐 <a href="https://sosapient.in/career" style="color: #0073e6; text-decoration: none;">www.sosapient.in</a></p>
                <div style="padding-top: 10px;">
                    <a href="SOCIAL_LINK_FACEBOOK" style="margin: 0 5px; text-decoration: none;">
                        <img src="https://cdn-icons-png.freepik.com/256/15707/15707884.png?semt=ais_hybrid" alt="Facebook" style="width: 24px;">
                    </a>
                    <a href="SOCIAL_LINK_TWITTER" style="margin: 0 5px; text-decoration: none;">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7fj1vqat9XLO4cFwOG1uFqLXYDcISiYil2w&s" alt="Twitter" style="width: 24px;">
                    </a>
                    <a href="SOCIAL_LINK_LINKEDIN" style="margin: 0 5px; text-decoration: none;">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png" alt="LinkedIn" style="width: 24px;">
                    </a>
                </div>
            </div>
        </div>
        `,
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
