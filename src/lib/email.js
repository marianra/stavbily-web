import nodemailer from 'nodemailer';
import { SEZNAM_USER, SEZNAM_PASSWORD } from '$env/static/private';

export const transporter = nodemailer.createTransport({
  host: 'smtp.seznam.cz',
  port: 465,
  secure: true,
  auth: {
    user: SEZNAM_USER,
    pass: SEZNAM_PASSWORD
  }
});