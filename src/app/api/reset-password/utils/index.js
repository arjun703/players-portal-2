export function generateHTMLforVerificaitonCode(code , email){
    return`
    <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verification Code</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                        color: #333333;
                    }
                    .content {
                        text-align: center;
                    }
                    .content p {
                        font-size: 16px;
                        color: #666666;
                    }
                    .code {
                        display: inline-block;
                        font-size: 24px;
                        font-weight: bold;
                        color: #333333;
                        background-color: #f0f0f0;
                        padding: 10px 20px;
                        margin: 20px 0;
                        border-radius: 4px;
                        letter-spacing: 2px;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        font-size: 14px;
                        color: #999999;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Email Verification</h1>
                    </div>
                    <div class="content">
                        <p>Hello,</p>
                        <p>You requested to verify your email address: <strong>${email}</strong></p>
                        <p>Please use the verification code below to complete your verification:</p>
                        <div class="code">${code}</div>
                        <p>If you didn't request this, please ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p>Thank you!</p>
                    </div>
                </div>
            </body>
        </html>
    `
}