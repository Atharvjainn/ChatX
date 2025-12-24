export const getWelcomeEmailTemplate = (name, actionUrl) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Welcome</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 0;">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
              
              <!-- Header -->
              <tr>
                <td style="background:#111827; color:#ffffff; padding:20px; text-align:center;">
                  <h1 style="margin:0;">Welcome to ChatX 🚀</h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:30px; color:#333;">
                  <p style="font-size:16px;">Hi <strong>${name}</strong>,</p>

                  <p style="font-size:15px; line-height:1.6;">
                    We’re excited to have you onboard! Click the button below to continue.
                  </p>

                  <!-- Button -->
                  <div style="text-align:center; margin:30px 0;">
                    <a href="${actionUrl}"
                       style="
                         background:#2563eb;
                         color:#ffffff;
                         padding:12px 24px;
                         text-decoration:none;
                         border-radius:6px;
                         font-size:16px;
                         display:inline-block;
                       ">
                      Get Started
                    </a>
                  </div>

                  <p style="font-size:14px; color:#666;">
                    If you didn’t request this, you can safely ignore this email.
                  </p>

                  <p style="font-size:14px;">
                    — Team ChatX
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f1f5f9; text-align:center; padding:15px; font-size:12px; color:#666;">
                  © 2026 ChatX. All rights reserved.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
