import test from "playwright/test";
import * as nodemailer from "nodemailer";



const filePath = "../SEO_SLIC_LIVE.xlsx";
const fileName = "../SEO_SLIC_LIVE.xlsx";


test("emailSend", async () => {
  
  await sendEmail(fileName, filePath);
  console.log("email sent successfully");
});

// Function to send email
async function sendEmail(reportContent, filePath) {
  // Create a transporter using SMTP or other configurations
  let transporter = nodemailer.createTransport({
    host: "smtp.rediffmailpro.com",
    port: 465,
    secure: true, // Set to true if using SSL
    auth: {
      user: "jeraldfelix.a@novactech.in",
      pass: "Jeraldfelix.a@12345",
    },
  });
  const now = new Date();
  const formattedDate = now.toLocaleString().replace(/[\/\s,:]/g, "_");
  // Compose email content
  let mailOptions = {
    from: "jeraldfelix.a@novactech.in",
    to: "edwinraj.i@novactech.in",
    cc:"DigitalEng.QA@novactech.in",

    subject: ` SEO SLIC LIVE Test Execution Report_${formattedDate}`,
    text: reportContent,
    attachments: [
      {
        filename: fileName,
        path: filePath,
      },
    ],
  };

  // Send email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}