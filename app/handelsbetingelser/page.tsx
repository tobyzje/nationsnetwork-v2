import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Handels- og leveringsbetingelser | Nations Network',
  description: 'Læs vores handels- og leveringsbetingelser for webudvikling og hosting ydelser.',
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-zinc-100 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Handels- og leveringsbetingelser</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Anvendelse</h2>
            <p className="text-gray-600">
              Disse almindelige salgs- og leveringsbetingelser gælder for alle aftaler indgået med NationsNetwork, CVR-nummer 45062260.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Aftalegrundlag</h2>
            <p className="text-gray-600">
              Betingelserne udgør sammen med NationsNetworks tilbud og ordrebekræftelser det samlede aftalegrundlag. Ændringer og tillæg er kun gældende ved skriftlig aftale mellem parterne.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Produkter og ydelser</h2>
            <p className="text-gray-600">
              Alle produkter og ydelser leveres i overensstemmelse med dansk lovgivning. NationsNetwork er ikke ansvarlig for materiale leveret af kunden, som krænker tredjemands rettigheder.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Priser og betaling</h2>
            <p className="text-gray-600">
              Alle priser er i DKK og ekskl. moms. Betalingsbetingelser er 14 dage netto fra fakturadato. Ved forsinket betaling pålægges rente på 2% pr. påbegyndt måned.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Hosting & Support</h2>
            <p className="text-gray-600">
              Hosting og support ydelser fornyes automatisk for 12 måneder ad gangen. Opsigelse skal ske skriftligt senest 30 dage før udløb af indeværende periode. Der ydes ingen refusion ved opsigelse midt i en periode.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Immaterielle rettigheder</h2>
            <p className="text-gray-600">
              Den fulde ejendomsret til alle immaterielle rettigheder tilhører NationsNetwork indtil fuld betaling er modtaget. Herefter overgår alle rettigheder til kunden.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Fortrydelsesret</h2>
            <p className="text-gray-600">
              Ved bekræftelse af en aftale har kunden ingen fortrydelsesret. Ved opsigelse af samarbejdet efter aftalens indgåelse er kunden forpligtet til at betale for det udførte arbejde, minimum 50% af den aftalte pris.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Levering og godkendelse</h2>
            <p className="text-gray-600">
              Ved levering skal kunden gennemgå det leverede og meddele eventuelle mangler inden for 14 dage. Herefter anses leverancen som godkendt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Misligholdelse</h2>
            <p className="text-gray-600">
              Ved kundens manglende betaling forbeholder NationsNetwork sig retten til at lukke for adgang til hjemmeside, webshop og administrationsmodul indtil betaling er modtaget.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Fortrolighed</h2>
            <p className="text-gray-600">
              Parterne forpligter sig til at behandle alle oplysninger om hinanden fortroligt. Denne forpligtelse gælder også efter samarbejdets ophør.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 