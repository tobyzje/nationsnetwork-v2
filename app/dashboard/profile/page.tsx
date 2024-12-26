import { cookies } from "next/headers"
import { query } from "@/lib/db"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Building2, Mail, Phone } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface User {
  id: string
  email: string
  name: string | null
  phone: string | null
  companyName: string | null
  cvr: string | null
  address: string | null
  city: string | null
  zipCode: string | null
  createdAt: Date
}

async function getProfile(token: string) {
  try {
    const users = await query(
      'SELECT * FROM users WHERE id = (SELECT user_id FROM sessions WHERE token = ?)',
      [token]
    ) as User[]
    return users[0]
  } catch (error) {
    console.error('Profil fejl:', error)
    return null
  }
}

export default async function ProfilePage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  if (!token) return null

  const user = await getProfile(token)
  if (!user) return null

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-2xl font-bold mb-8">Min Profil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Personlige Oplysninger</h2>
              <p className="text-gray-500">Dine kontaktoplysninger</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Navn</p>
              <p className="font-medium">{user.name || 'Ikke angivet'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Telefon</p>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <p className="font-medium">{user.phone || 'Ikke angivet'}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Medlem siden</p>
              <p className="font-medium">{formatDate(new Date(user.createdAt))}</p>
            </div>
          </div>

          <Button className="w-full mt-6">
            Rediger Profil
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Virksomhedsoplysninger</h2>
              <p className="text-gray-500">Din virksomheds detaljer</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Virksomhedsnavn</p>
              <p className="font-medium">{user.companyName || 'Ikke angivet'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">CVR-nummer</p>
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

          <Button className="w-full mt-6" variant="outline">
            Rediger Virksomhed
          </Button>
        </Card>
      </div>
    </div>
  )
}