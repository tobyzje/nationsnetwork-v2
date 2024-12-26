import UnderConstruction from "../components/UnderConstruction"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Under Opbygning | Nations Network',
  description: 'Denne side er under opbygning. Kom tilbage snart!',
}

export default function UnderConstructionPage() {
  return <UnderConstruction />
} 