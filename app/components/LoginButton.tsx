"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, User } from "lucide-react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import { useAuth } from "@/context/AuthContext"
import { cn } from "@/lib/utils"

interface LoginButtonProps {
  isScrolled?: boolean;
}

export default function LoginButton({ isScrolled }: LoginButtonProps) {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className={cn(
              "flex items-center gap-2 transition-colors",
              isScrolled 
                ? "text-gray-600 hover:text-green-500" 
                : "text-black hover:text-green-400"
            )}
          >
            <User className="h-4 w-4" />
            <span>{user.name || 'Min profil'}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <a href="/dashboard">Dashboard</a>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-red-600 cursor-pointer"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log ud
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "transition-colors",
            isScrolled 
              ? "text-gray-600 hover:text-green-500" 
              : "text-black hover:text-green-400"
          )}
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Velkommen tilbage</DialogTitle>
          <DialogDescription>
            Log ind eller opret en konto for at fortsætte
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Log ind</TabsTrigger>
            <TabsTrigger value="signup">Opret konto</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm onSuccess={() => setOpen(false)} />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm onSuccess={() => setOpen(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 