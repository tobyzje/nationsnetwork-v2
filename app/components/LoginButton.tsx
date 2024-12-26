"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import { useAuth } from "@/context/AuthContext"
import { cn } from "@/lib/utils"

interface LoginButtonProps {
  isScrolled?: boolean;
}

export default function LoginButton({ isScrolled }: LoginButtonProps) {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  if (user) {
    return (
      <Button variant="outline" asChild>
        <a href="/dashboard">Dashboard</a>
      </Button>
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