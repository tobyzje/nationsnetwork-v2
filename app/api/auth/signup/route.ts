import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    // Validér at nødvendige felter er til stede
    if (!data.email || !data.password) {
      return NextResponse.json(
        { error: "Email og password er påkrævet" },
        { status: 400 }
      )
    }

    // Check om bruger allerede eksisterer
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email er allerede i brug" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        phone: data.phone || null,
        companyName: data.companyName || null,
        cvr: data.cvr || null,
        address: data.address || null,
        city: data.city || null,
        zipCode: data.zipCode || null,
        contactPerson: data.contactPerson || data.name || null,
        contactEmail: data.contactEmail || data.email || null,
        contactPhone: data.contactPhone || data.phone || null,
      },
    })

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined')
      return NextResponse.json(
        { error: "Server konfigurationsfejl" },
        { status: 500 }
      )
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({ 
      message: "Bruger oprettet",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    })

    // Sæt cookie med token
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 dage
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { 
        error: "Der skete en fejl ved oprettelse af bruger",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 