import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value
    
    if (!token) {
      return NextResponse.json({ error: "Ikke autoriseret" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    const admin = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { isAdmin: true }
    })

    if (!admin?.isAdmin) {
      return NextResponse.json({ error: "Ikke autoriseret" }, { status: 401 })
    }

    const { userId, enabled } = await req.json()

    await prisma.user.update({
      where: { id: userId },
      data: { 
        hasWebSolution: enabled,
        webSolutionType: enabled ? 'starter' : null
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin action error:', error)
    return NextResponse.json(
      { error: "Der skete en fejl" },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 