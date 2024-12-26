import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

interface Addon {
  id: string
  label: string
  price: string
  period?: string
}

interface EmailData {
  name: string
  email: string
  phone: string
  company?: string
  message?: string
  product: string
  addons?: Addon[]
}

// Opret SMTP transporter med Outlook/Hotmail
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
})

const emailTemplate = (data: EmailData) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #f5f5f5; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
    .content { background: white; padding: 20px; border-radius: 5px; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
    .addons { margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Ny forespørgsel på ${data.product}</h2>
    </div>
    <div class="content">
      <p><strong>Navn:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Telefon:</strong> ${data.phone}</p>
      ${data.company ? `<p><strong>Virksomhed:</strong> ${data.company}</p>` : ''}
      ${data.message ? `<p><strong>Besked:</strong> ${data.message}</p>` : ''}
      
      ${data.addons?.length ? `
        <div class="addons">
          <h3>Ønskede tilkøb:</h3>
          <ul>
            ${data.addons.map((addon: Addon) => `
              <li>${addon.label} - ${addon.price} kr${addon.period ? `/${addon.period}` : ''}</li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
    <div class="footer">
      <p>Denne email er sendt fra kontaktformularen på nationsnetwork.dk</p>
    </div>
  </div>
</body>
</html>
`

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, company, message, product, addons } = body as EmailData

    // Test email først
    console.log('Sending email with:', { name, email, product })

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Ny forespørgsel på ${product}`,
      html: emailTemplate({ name, email, phone, company, message, product, addons })
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:', info.response)

    return NextResponse.json({ success: true })
    
  } catch (error) {
    // Log den specifikke fejl
    console.error('Detailed error:', error)
    return NextResponse.json(
      { error: 'Email fejl - tjek server logs' },
      { status: 500 }
    )
  }
} 