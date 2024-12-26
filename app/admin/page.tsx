import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { 
  Users, Settings, Shield,
  CheckCircle, XCircle
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const prisma = new PrismaClient()

async function getAdminData(token: string) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
  const admin = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: { isAdmin: true }
  })

  if (!admin?.isAdmin) return null

  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      companyName: true,
      cvr: true,
      hasWebSolution: true,
      webSolutionType: true,
      createdAt: true,
      subscriptions: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

interface Subscription {
  id: string
  name: string
  validUntil: Date
  createdAt: Date
  userId: string
}

interface AdminUser {
  id: string
  email: string
  name: string | null
  companyName: string | null
  cvr: string | null
  hasWebSolution: boolean
  webSolutionType: string | null
  createdAt: Date
  subscriptions: Subscription[]
}

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  if (!token) return null

  const users = await getAdminData(token)
  if (!users) return <div>Ingen adgang</div>

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="container mx-auto px-4 py-8 mt-24">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Users className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Brugere</h2>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Navn</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Virksomhed</TableHead>
                <TableHead>CVR</TableHead>
                <TableHead>Webløsning</TableHead>
                <TableHead>Oprettet</TableHead>
                <TableHead>Handlinger</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: AdminUser) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name || '-'}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.companyName || '-'}</TableCell>
                  <TableCell>{user.cvr || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {user.hasWebSolution ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      {user.webSolutionType || 'Ingen'}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString('da-DK')}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-2" />
                          Administrer
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Administrer Bruger</DialogTitle>
                          <DialogDescription>
                            {user.name || user.email}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex flex-col gap-4">
                            <Button 
                              variant={user.hasWebSolution ? "destructive" : "default"}
                              onClick={async () => {
                                await fetch('/api/admin/toggle-web-solution', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ 
                                    userId: user.id,
                                    enabled: !user.hasWebSolution 
                                  })
                                })
                              }}
                            >
                              {user.hasWebSolution ? 'Deaktiver' : 'Aktiver'} Webløsning
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={async () => {
                                await fetch('/api/admin/reset-password', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ userId: user.id })
                                })
                              }}
                            >
                              Nulstil Adgangskode
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
} 