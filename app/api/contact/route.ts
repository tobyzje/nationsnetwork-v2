import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Opret en sikker SMTP forbindelse
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true
  }
});

// Tilføj email validering
async function validateEmail() {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email validation error:', error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    // Valider email konfiguration
    const isEmailValid = await validateEmail();
    if (!isEmailValid) {
      throw new Error('Email configuration is invalid');
    }

    const data = await req.json();
    
    // Email til virksomheden
    const companyMail = {
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: 'Ny kontaktformular henvendelse',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Ny henvendelse fra hjemmesiden</h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
            <p><strong>Navn:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Telefon:</strong> ${data.phone || 'Ikke angivet'}</p>
            <p><strong>Virksomhed:</strong> ${data.company || 'Ikke angivet'}</p>
            <p><strong>Besked:</strong></p>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
      `
    };

    // Autosvar til kunden
    const customerMail = {
      from: process.env.SMTP_FROM,
      to: data.email,
      subject: 'Tak for din henvendelse - NationsNetwork',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Tak for din henvendelse</h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
            <p>Kære ${data.name},</p>
            <p>Vi har modtaget din besked og vender tilbage til dig inden for 24 timer.</p>
            <br>
            <p>Med venlig hilsen</p>
            <p style="color: #16a34a; font-weight: bold;">NationsNetwork</p>
          </div>
        </div>
      `
    };

    // Send begge emails
    await transporter.sendMail(companyMail);
    await transporter.sendMail(customerMail);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Der skete en fejl ved afsendelse af beskeden' },
      { status: 500 }
    );
  }
} 