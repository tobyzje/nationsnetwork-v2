"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { da } from 'date-fns/locale'
import { Input } from "@/components/ui/input"

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
]

export default function BookingCalendar() {
  const [date, setDate] = React.useState<Date>()
  const [selectedTime, setSelectedTime] = React.useState<string>()
  const [name, setName] = React.useState<string>("")
  const [phone, setPhone] = React.useState<string>("")

  const handleBooking = () => {
    if (date && selectedTime && name && phone) {
      console.log("Booking for:", format(date, 'dd/MM/yyyy'), "at", selectedTime)
      console.log("Kunde:", name, "Telefon:", phone)
      // Her kan du implementere din booking logik
    }
  }

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Book et telefonmøde
          </CardTitle>
          <CardDescription>
            Vælg en dato og et tidspunkt der passer dig
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Dit navn</label>
            <Input 
              placeholder="Indtast dit navn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Dit telefonnummer</label>
            <Input 
              placeholder="Indtast dit telefonnummer"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2 items-center">
            <label className="text-sm font-medium">Vælg dato</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={da}
              className="rounded-md border"
              disabled={(date) => {
                const day = date.getDay()
                // Deaktiver weekender (0 = søndag, 6 = lørdag)
                return day === 0 || day === 6 || date < new Date()
              }}
            />
          </div>

          {date && (
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-center">Vælg tidspunkt</label>
              <Select onValueChange={setSelectedTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Vælg tid" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {time}
                      </span>
                    </SelectItem>
                  ))}

                </SelectContent>
              </Select>
            </div>
          )}

        

          {date && selectedTime && (
            <div className="mt-4 p-4 bg-green-50 rounded-md text-center">
              <p className="text-sm text-green-700">
                Du har valgt: {format(date, 'dd/MM/yyyy', { locale: da })} kl. {selectedTime}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleBooking} 
            className="w-full bg-green-500 hover:bg-green-600"
            disabled={!date || !selectedTime || !name || !phone}
          >
            Book mødet
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 