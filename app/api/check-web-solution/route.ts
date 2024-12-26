import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ hasWebSolution: false })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    
    const webSolution = await prisma.webSolution.findFirst({
      where: {
        userId: decoded.userId,
        isActive: true,
        endDate: {
          gt: new Date()
        }
      },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json({
      hasWebSolution: !!webSolution,
      solution: webSolution ? {
        type: webSolution.type,
        startDate: webSolution.startDate,
        endDate: webSolution.endDate,
        domain: webSolution.domain,
        features: webSolution.features
      } : null
    })

  } catch (error) {
    console.error('Web solution check error:', error)
    return NextResponse.json({ hasWebSolution: false })
  }
} 