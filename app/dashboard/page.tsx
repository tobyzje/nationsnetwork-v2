import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as { userId: string }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        subscriptions: true,
        supportTickets: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 3
        }
      }
    })
    return user
  } catch {
    return null
  }
}

interface SupportTicket {
  id: string
  title: string
  status: string
}

interface Subscription {
  id: string
  name: string
  validUntil: Date
}

export default async function DashboardPage() {
  const user = await getUser()
  
  if (!user) {
    redirect("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Din Profil</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Dine Oplysninger</h2>
          <p>Email: {user.email}</p>
          <p>Navn: {user.name}</p>
          <p>Medlem siden: {new Date(user.createdAt).toLocaleDateString('da-DK')}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Dine Løsninger</h2>
          {user.subscriptions.length > 0 ? (
            <ul className="space-y-2">
              {user.subscriptions.map((sub: Subscription) => (
                <li key={sub.id} className="flex justify-between items-center">
                  <span>{sub.name}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(sub.validUntil).toLocaleDateString('da-DK')}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Ingen aktive løsninger</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Support</h2>
          {user.supportTickets.length > 0 ? (
            <ul className="space-y-2">
              {user.supportTickets.map((ticket: SupportTicket) => (
                <li key={ticket.id} className="text-sm">
                  <p className="font-medium">{ticket.title}</p>
                  <p className="text-gray-500">Status: {ticket.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Ingen aktive support sager</p>
          )}
          <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Opret Support Sag
          </button>
        </div>
      </div>
    </div>
  )
}