<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Professional OTP Verification</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
      background-color: #f9fafb;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 24px;
    }

    .container {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 100%;
      padding: 32px;
      box-sizing: border-box;
      text-align: center;
    }

    .logo {
      width: 80px;
      height: 80px;
      margin: 0 auto 16px auto;
      display: block;
      object-fit: contain;
    }

    h1 {
      font-weight: 600;
      font-size: 24px;
      color: #111827;
      margin: 0 0 8px 0;
    }

    p.description {
      font-weight: 400;
      font-size: 14px;
      color: #4b5563;
      margin: 0 0 32px 0;
    }

    .otp-box {
      background-color: #f3f4f6;
      border-radius: 8px;
      padding: 24px 20px;
      margin-bottom: 32px;
    }

    .label {
      font-weight: 600;
      font-size: 16px;
      color: #374151;
      margin: 0 0 8px 0;
    }

    .email-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }

    .email-text {
      font-weight: 500;
      font-size: 15px;
      color: #111827;
      word-break: break-word;
    }

    .edit-button {
      background: none;
      border: none;
      color: #2563eb;
      cursor: pointer;
      font-size: 16px;
      padding: 0;
      display: flex;
      align-items: center;
      transition: color 0.2s ease-in-out;
    }

    .edit-button:hover,
    .edit-button:focus {
      color: #1e40af;
      outline: none;
    }

    .otp-code {
      font-weight: 800;
      font-size: 32px;
      letter-spacing: 0.2em;
      color: #4f46e5;
      user-select: all;
      margin: 0;
    }

    .footer-text {
      font-weight: 400;
      font-size: 12px;
      color: #6b7280;
      line-height: 1.4;
      margin: 0;
    }

    /* Icon style */
    .fa-pencil-alt {
      font-size: 16px;
    }

    @media (max-width: 480px) {
      .container {
        padding: 24px 16px;
      }

      .otp-code {
        font-size: 28px;
      }
    }
  </style>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
  />
</head>
<body>
  <div class="container" role="main">
    <img
      src="https://storage.googleapis.com/a1aa/image/78dbe83f-a035-4cc8-b59b-ba788df8e352.jpg"
      alt="Company logo placeholder, blue and white"
      class="logo"
      width="80"
      height="80"
    />
    <h1>Verification Code</h1>
    <p class="description">We have sent a one-time password (OTP) to your email address.</p>
    <div class="otp-box" aria-label="Verification details">
      <p class="label">Email Address</p>
      <div class="email-row">
        <span class="email-text">mdasadur135@gmail.com</span>
        <button aria-label="Edit email" class="edit-button" type="button">
          <i class="fas fa-pencil-alt" aria-hidden="true"></i>
        </button>
      </div>
      <p class="label">Your OTP Code</p>
      <p class="otp-code">{{ $otp ?? "OTP" }}</p>
    </div>
    <p class="footer-text">
      Please, Don't share your OTP..
    </p>
  </div>
</body>
</html>