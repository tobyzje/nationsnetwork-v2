export default function Kontakt() {
    return (
        <div className="relative min-h-screen bg-zinc-700">
            <div className="absolute inset-0 flex items-start justify-center pt-28 pb-12 px-4">
                <div className="flex flex-col lg:flex-row gap-8 max-w-6xl w-full">
                    <div className="bg-white rounded-lg shadow-lg w-full lg:max-w-md p-6 sm:p-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">Kontakt os</h1>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Navn
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Dit navn"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="din@email.dk"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Telefon
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="+45 12 34 56 78"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                    Virksomhed
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Dit firma"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="cvr" className="block text-sm font-medium text-gray-700">
                                    CVR nummer
                                </label>
                                <input
                                    type="text"
                                    id="cvr"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="12345678"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Besked
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder="Skriv din besked her..."
                                    required
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                                    required
                                />
                                <label htmlFor="consent" className="text-sm text-gray-600">
                                    Jeg accepterer at NationsNetwork må kontakte mig telefonisk
                                </label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="kontakt-tid-9-11"
                                    className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                                />
                                <label htmlFor="consent" className="text-sm text-gray-600">
                                    Jeg vil helst kontaktes mellem <b>08:00</b> og <b>11:00</b>?
                                </label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="kontakt-tid-11-17"
                                    className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                                />
                                <label htmlFor="consent" className="text-sm text-gray-600">
                                    Jeg vil helst kontaktes mellem <b>11:00</b> og <b>17:00</b>?
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                            >
                                Send besked
                            </button>
                        </form>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg h-fit w-full lg:max-w-md p-6 sm:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Kontakt Information</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-700">Svartid</h3>
                                <p className="text-sm sm:text-base text-gray-600">
                                    Vi bestræber os på at svare inden for 1-2 hverdage
                                </p>
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-700">Åbningstider</h3>
                                <p className="text-sm sm:text-base text-gray-600">Mandag - Fredag: 8:00 - 17:00</p>
                                <p className="text-sm sm:text-base text-gray-600">Weekend: Lukket</p>
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-700">Kontakt</h3>
                                <div className="space-y-1">
                                    <p className="text-sm sm:text-base text-gray-600 hover:text-green-500">
                                        <a href="tel:+4527572437">📞 +45 27 57 24 37 (Tobias)</a>
                                    </p>
                                    <p className="text-sm sm:text-base text-gray-600 hover:text-green-500">
                                        <a href="tel:+45">📞 +45 TBA (Lucas)</a>
                                    </p>
                                    <p className="text-sm sm:text-base text-gray-600 hover:text-green-500">
                                        <a href="mailto:kontakt@nationsnetwork.dk">✉️ kontakt@nationsnetwork.dk</a>
                                    </p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Har du brug for øjeblikkelig assistance? Ring til os på vores hovednummer.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}