function TestEmailTemplate(email) {
  this.to = email;
  this.subject = "Test Email - No Action Required";
  this.html = `
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; text-align: center; border: 1px solid #e0e0e0;">
          <h2 style="color: #4CAF50;">Test Email</h2>
          <p style="font-size: 16px; color: #333;">
            This is a <strong>test email</strong> to confirm that the email service is working correctly for Plan My Post.
          </p>
          <p style="font-size: 14px; color: #555;">
            No reply or action is needed. You can safely ignore this email.
          </p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999;">
            Sent automatically by the Email Service Monitor for Plan My Post.
          </p>
        </div>
      </body>
    `;
}

module.exports = TestEmailTemplate;
