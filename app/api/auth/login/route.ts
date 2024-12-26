import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { query } from "@/lib/db"
import { cookies } from "next/headers"
import { DbUser } from "@/types"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Find bruger
    const users = await query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    ) as DbUser[]
    
    const user = users[0]
    if (!user) {
      return NextResponse.json(
        { message: "Ugyldig email eller adgangskode" },
        { status: 401 }
      )
    }

    // Verificer password
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return NextResponse.json(
        { message: "Ugyldig email eller adgangskode" },
        { status: 401 }
      )
    }

    // Generer JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        isAdmin: user.isAdmin 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )

    // Sæt cookie
    const cookieStore = await cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 24 timer
    })

    // Send bruger data (uden password)
    const userData = Object.fromEntries(
      Object.entries(user as DbUser).filter(([key]) => key !== 'password')
    )
    
    return NextResponse.json({
      user: userData,
      message: "Login succesfuldt"
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: "Der skete en fejl under login" },
      { status: 500 }
    )
  }
}
