"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { loadStripe } from "@stripe/stripe-js"
import { toast } from "@/hooks/use-toast"

interface Module {
  name: string
  price: number
  monthly?: boolean
  required?: boolean
  description?: string
}

interface Category {
  category: string
  options: Module[]
}

interface Props {
  modules: Category[]
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

export default function CustomSolutionBuilder({ modules }: Props) {
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  
  const calculateTotal = () => {
    let oneTime = 0
    let monthly = 0
    
    selectedModules.forEach(moduleName => {
      modules.forEach(category => {
        const moduleItem = category.options.find(m => m.name === moduleName)
        if (moduleItem) {
          if (moduleItem.monthly) {
            monthly += moduleItem.price
          } else {
            oneTime += moduleItem.price
          }
        }
      })
    })
    
    return { oneTime, monthly }
  }

  const handleToggle = (moduleName: string, required?: boolean) => {
    if (required) return
    
    setSelectedModules(prev => 
      prev.includes(moduleName)
        ? prev.filter(m => m !== moduleName)
        : [...prev, moduleName]
    )
  }

  const handleCheckout = async () => {
    const selectedModuleDetails = selectedModules.map(moduleName => {
      let moduleItem
      modules.forEach(category => {
        const found = category.options.find(m => m.name === moduleName)
        if (found) moduleItem = found
      })
      return moduleItem
    }).filter(Boolean)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/create-custom-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedModules: selectedModuleDetails,
          totals: calculateTotal(),
        }),
      })

      const { sessionId, error } = await response.json()
      if (error) throw new Error(error)

      const stripe = await stripePromise
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }
    } catch (error) {
      toast({
        title: "Fejl ved betaling",
        description: error instanceof Error ? error.message : "Der skete en fejl",
        variant: "destructive",
      })
    }
  }

  const totals = calculateTotal()

  return (
    <div className="space-y-8">
      {modules.map((category, idx) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.options.map((moduleItem) => (
              <Card
                key={moduleItem.name}
                className={`p-4 cursor-pointer hover:shadow-md transition-shadow
                  ${selectedModules.includes(moduleItem.name) ? 'border-green-500' : ''}`}
                onClick={() => handleToggle(moduleItem.name, moduleItem.required)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedModules.includes(moduleItem.name)}
                    disabled={moduleItem.required}
                  />
                  <div>
                    <div className="font-medium">{moduleItem.name}</div>
                    {moduleItem.description && (
                      <p className="text-sm text-gray-500">{moduleItem.description}</p>
                    )}
                    <div className="text-sm text-gray-600">
                      {moduleItem.price} kr
                      {moduleItem.monthly ? '/md' : ' engangspris'}
                      {moduleItem.required && ' (påkrævet)'}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      ))}

      <div className="bg-white rounded-lg p-6 shadow-lg mt-8">
        <h3 className="text-xl font-semibold mb-4">Samlet Pris</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Engangspris:</span>
            <span className="font-semibold">{totals.oneTime} kr</span>
          </div>
          <div className="flex justify-between">
            <span>Månedlig pris:</span>
            <span className="font-semibold">{totals.monthly} kr/md</span>
          </div>
        </div>
        <Button 
          className="w-full mt-6" 
          onClick={handleCheckout}
          disabled={selectedModules.length === 0}
        >
          Gå til betaling
        </Button>
      </div>
    </div>
  )
} 