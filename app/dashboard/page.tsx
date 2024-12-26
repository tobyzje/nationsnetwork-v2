import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { 
  User, Package, MessageSquare, 
  Building2, AlertCircle 
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SupportTicket {
  id: string
  title: string
  status: string
  createdAt: Date
  userId: string
}

const prisma = new PrismaClient()

async function getUser(token: string) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
  return prisma.user.findUnique({
    where: { id: decoded.userId },
    include: {
      subscriptions: true,
      supportTickets: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })
}

export default async function Dashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  if (!token) return null

  const user = await getUser(token)
  if (!user) return null

  return (
    <div className="bg-zinc-700 min-h-screen">
      <div className="container mx-auto px-4 py-8 mt-24 md:mt-32">
        {/* Profil sektion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Din Profil</h2>
                <p className="text-gray-500">Personlige oplysninger</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Navn</p>
                <p className="font-medium">{user.name || 'Ikke angivet'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mobil</p>
                <p className="font-medium">{user.phone || 'Ikke angivet'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Medlem siden</p>
                <p className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString('da-DK')}
                </p>
              </div>
            </div>
          </Card>

          {/* Virksomhedsinfo */}
          <Card className="p-6 col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Virksomhed</h2>
                <p className="text-gray-500">Virksomhedsdetaljer</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Virksomhedsnavn</p>
                <p className="font-medium">{user.companyName || 'Ikke angivet'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">CVR</p>
                <p className="font-medium">{user.cvr || 'Ikke angivet'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Adresse</p>
                <p className="font-medium">
                  {user.address ? (
                    <>
                      {user.address}<br />
                      {user.zipCode} {user.city}
                    </>
                  ) : 'Ikke angivet'}
                </p>
              </div>
            </div>
          </Card>

          {/* Aktive løsninger */}
          <Card className="p-6 col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Dine Løsninger</h2>
                <p className="text-gray-500">Aktive services</p>
              </div>
            </div>
            {user.hasWebSolution ? (
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-700">
                    <Package className="w-5 h-5" />
                    <div>
                      <span className="font-medium">Webløsning Aktiv</span>
                      <p className="text-sm text-green-600">{user.webSolutionType}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="text-green-700 border-green-700 hover:bg-green-50"
                    asChild
                  >
                    <Link href="/">
                      Administrer
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-600">Ingen aktive løsninger</p>
                <Button 
                  className="mt-3 w-full" 
                  variant="outline"
                  asChild
                >
                  <Link href="/priser">
                    Se vores løsninger
                  </Link>
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Support sektion */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Support Sager</h2>
                <p className="text-gray-500">Dine aktive henvendelser</p>
              </div>
            </div>
            <Button>
              Opret ny sag
            </Button>
          </div>
          
          {user.supportTickets.length > 0 ? (
            <div className="space-y-4">
              {user.supportTickets.map((ticket: SupportTicket) => (
                <div 
                  key={ticket.id} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{ticket.title}</h3>
                    <p className="text-sm text-gray-500">
                      Oprettet {new Date(ticket.createdAt).toLocaleDateString('da-DK')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${ticket.status === 'open' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {ticket.status === 'open' ? 'Åben' : 'Lukket'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Ingen aktive support sager</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}