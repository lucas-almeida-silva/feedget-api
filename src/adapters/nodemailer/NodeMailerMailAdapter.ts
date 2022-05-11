import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from "../MailAdapter";

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Lucas Almeida <lucas.almeida@gmail.com>',
      subject,
      html: body,
    });
  }
}