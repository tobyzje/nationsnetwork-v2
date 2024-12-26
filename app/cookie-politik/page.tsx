import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Politik | Nations Network',
  description: 'Læs om hvordan vi bruger cookies på vores website.',
}

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-zinc-100 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Cookie Politik</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Generelt</h2>
            <p className="text-gray-600">
              NationsNetwork (CVR: 45062260) bruger cookies og lignende teknologier på vores website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Hvad er cookies?</h2>
            <p className="text-gray-600">
              Cookies er små tekstfiler, der gemmes på din enhed, når du besøger vores website. 
              De hjælper os med at forbedre din brugeroplevelse og levere relevante tjenester til dig.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Typer af cookies vi bruger</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-xl mb-2">Nødvendige cookies</h3>
                <p className="text-gray-600">
                  Disse er essentielle for at websitet kan fungere korrekt. De kan ikke fravælges.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Funktionelle cookies</h3>
                <p className="text-gray-600">
                  Bruges til at huske dine præferencer og valg på websitet.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Analytiske cookies</h3>
                <p className="text-gray-600">
                  Hjælper os med at forstå, hvordan besøgende bruger vores website, så vi kan forbedre oplevelsen.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Tredjepartscookies</h2>
            <p className="text-gray-600">
              Vi bruger tjenester fra betroede tredjeparter, som også kan placere cookies. 
              Dette inkluderer analyseredskaber og sociale medier.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Samtykke</h2>
            <p className="text-gray-600">
              Første gang du besøger vores website, vil du blive bedt om at give samtykke til vores brug af cookies. 
              Du kan til enhver tid ændre eller trække dit samtykke tilbage via cookie-indstillingerne i bunden af siden.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Sletning af cookies</h2>
            <p className="text-gray-600">
              Du kan altid slette cookies fra din browser. Se vejledning på: 
              <a href="https://minecookies.org/cookiehandtering" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-green-500 hover:underline ml-1">
                minecookies.org
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Kontakt</h2>
            <p className="text-gray-600">
              Har du spørgsmål til vores cookie-politik, er du velkommen til at kontakte os på kontakt@nationsnetwork.dk
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 