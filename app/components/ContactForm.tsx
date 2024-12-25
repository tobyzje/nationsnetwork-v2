"use client"

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    cvr: '',
    message: '',
    consent: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Her kan du tilføje din email logik
    console.log(formData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg" className="bg-green-500 hover:bg-green-600 text-white">
          Kontakt os
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kontakt os</DialogTitle>
          <DialogDescription>
            Udfyld formularen nedenfor, så vender vi tilbage hurtigst muligt.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Navn</Label>
            <Input
              id="name"
              placeholder="Dit navn"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="din@email.dk"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+45 12 34 56 78"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Navn på virksomhed</Label>
            <Input
              id="company"
              type="text"
              placeholder="Dit firma"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvr">CVR NUMMER</Label>
            <Input
              id="cvr"
              type="text"
              placeholder="12345678"
              value={formData.cvr}
              onChange={(e) => setFormData({ ...formData, cvr: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Besked</Label>
            <Textarea
              id="message"
              placeholder="Skriv din besked her..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="consent"
              className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              required
            />
            <Label htmlFor="consent" className="text-sm text-gray-600">
              Jeg accepterer at NationsNetwork må kontakte mig telefonisk
            </Label>
          </div>
          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
            Send besked
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 