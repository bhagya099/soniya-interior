"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * EmailJS configuration
 * ---------------------
 * The contact form uses EmailJS to send messages straight to your inbox
 * from the browser — no backend server needed. Free tier: 200 emails/month.
 *
 * SETUP (about 5 minutes):
 * 1. Go to https://www.emailjs.com and sign up (free).
 * 2. Email Services -> Add New Service -> connect your Gmail (or any inbox).
 *    Copy the "Service ID" it gives you into SERVICE_ID below.
 * 3. Email Templates -> Create New Template. Use these variable names in
 *    the template body so they match the form fields sent below:
 *      {{from_name}}, {{from_email}}, {{project_brief}}, {{message}}
 *    Set the "To email" field in the template to your own address
 *    (emial@gmail.com). Copy the "Template ID" into TEMPLATE_ID.
 * 4. Account -> General -> copy your "Public Key" into PUBLIC_KEY.
 * 5. Save this file. That's it — the form on the Contact page will start
 *    sending real emails.
 *
 * Until you fill these in, the form will show a friendly error instead of
 * silently failing.
 */
var emailConfig = {
  SERVICE_ID: "service_nkncmav",
  TEMPLATE_ID: "template_y4l2tad",
  PUBLIC_KEY: "HShLx4Yi73oUbqnvA"
};
var _default = emailConfig;
exports["default"] = _default;