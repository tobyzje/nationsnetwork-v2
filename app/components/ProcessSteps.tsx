"use client"

import { Card } from "@/components/ui/card"
import { Phone, FileEdit, Palette, ThumbsUp, CreditCard, CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Phone,
    title: "Indledende samtale",
    description: "Vi tager en uforpligtende snak om dine behov og ønsker"
  },
  {
    icon: FileEdit,
    title: "Plan & Tilbud",
    description: "Vi udarbejder en detaljeret plan og tilbud til dig"
  },
  {
    icon: Palette,
    title: "Gratis Design Udkast",
    description: "Vi laver et design udkast så du kan se hvordan din side kommer til at se ud"
  },
  {
    icon: ThumbsUp,
    title: "Evaluering",
    description: "Vi gennemgår designet sammen og laver eventuelle justeringer"
  },
  {
    icon: CreditCard,
    title: "Betaling",
    description: "Når du er tilfreds, starter vi udviklingen efter betaling"
  },
  {
    icon: CheckCircle,
    title: "Gennemført",
    description: "Din nye hjemmeside er klar til brug!"
  }
]

export default function ProcessSteps() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 ">
          <h2 className="text-3xl font-bold mb-4">Sådan foregår det</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vi guider dig gennem hele processen fra start til slut
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={index} className="p-6 relative">
                {index !== steps.length - 1 && (
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden lg:block z-10">
                    <ArrowRight className="h-8 w-8 text-gray-300" />
                  </div>
                )}
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-500">Trin {index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
} 