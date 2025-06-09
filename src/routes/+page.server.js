import { transporter } from '$lib/email.js';
import { fail } from '@sveltejs/kit';
import { GMAIL_USER } from '$env/static/private';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const phone = data.get('phone');
    const company = data.get('company');

    // Bot detection
    if ( phone || company) {
      console.log('Bot detected - honeypot fields filled');
      return fail(400, {
        error: 'Nepodařilo se odeslat zprávu.'
      });
    }

    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    try {
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: GMAIL_USER,
        subject: `Dotaz - ${name}`,
        html: `
          <h3>Nový dotaz z webu</h3>
          <p><strong>Jméno:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Zpráva:</strong></p>
          <p>${message}</p>
        `
      });

      return {
        success: true,
        message: 'Zpráva byla úspěšně odeslána!'
      };
    } catch (error) {
      console.error('Email error:', error);

      return fail(400, {
        error: 'Nepodařilo se odeslat zprávu.'
      });
    }
  }
};