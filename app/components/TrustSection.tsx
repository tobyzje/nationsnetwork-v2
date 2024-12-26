"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, ThumbsUp, Award, Users } from "lucide-react"

const reviews = [
    {
        name: "DU KAN VÆRE DEN FØRSTE",
        company: "Din virksomhed", 
        rating: 1,
        text: "Din kommentar her",
        date: "Nu"
      },
    {
    name: "DU KAN VÆRE DEN FØRSTE",
    company: "Din virksomhed",
    rating: 2,
    text: "Din kommentar her", 
    date: "Nu"
  },
  {
    name: "DU KAN VÆRE DEN FØRSTE",
    company: "Din virksomhed",
    rating: 3,
    text: "Din kommentar her",
    date: "Nu"
  },
  {
    name: "DU KAN VÆRE DEN FØRSTE",
    company: "Din virksomhed",
    rating: 4,
    text: "Din kommentar her",
    date: "Nu"
  },
  {
    name: "DU KAN VÆRE DEN FØRSTE",
    company: "Din virksomhed",
    rating: 5,
    text: "Din kommentar her",
    date: "Nu"
  }
]

const stats = [
  { icon: ThumbsUp, value: "0%", label: "Kundetilfredshed" },
  { icon: Users, value: "0+", label: "Aktive kunder" },
  { icon: Award, value: "0%", label: "Gennemførte projekter" }
]

export default function TrustSection() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-3xl font-bold mb-4">Det siger vores kunder</h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-gray-400 text-gray-400 animate-pulse" />
            ))}
          </div>
          <p className="text-xl font-semibold text-gray-600">0 ud af 5 baseret på kundetilfredshed</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: `${index * 200}ms` }}>
                <Icon className="h-12 w-12 mx-auto mb-4 text-blue-600 animate-bounce-slow" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-gray-50 hover:scale-105 transition-transform duration-300 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 150}ms` }}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{review.text}</p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-gray-600">{review.company}</p>
                  <p className="text-sm text-gray-500 mt-1">{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}