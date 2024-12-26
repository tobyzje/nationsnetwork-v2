import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { query } from "@/lib/db"
import { DbUser } from "@/types"

export async function POST(req: Request) {
  try {
    const { email, password, name, companyName, phone } = await req.json()

    // Check om email allerede er i brug
    const existingUsers = await query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    ) as DbUser[]

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { message: "Email er allerede i brug" },
        { status: 400 }
      )
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Opret bruger
    await query(
      `INSERT INTO users (email, password, name, companyName, phone, createdAt, updatedAt) 
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [email, hashedPassword, name, companyName, phone]
    )

    return NextResponse.json({
      message: "Bruger oprettet succesfuldt"
    }, { status: 201 })

  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { message: "Der skete en fejl under oprettelsen" },
      { status: 500 }
    )
  }
}
