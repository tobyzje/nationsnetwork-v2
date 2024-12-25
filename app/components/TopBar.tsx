import { Mail, Phone, Clock } from "lucide-react"

export default function TopBar() {
    return (
        <div className="bg-green-500 text-white py-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
                    {/* Venstre side - Kontakt info */}
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center space-x-4">
                            <a href="mailto:kontakt@nationsnetwork.dk" className="hover:underline flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                <span>kontakt@nationsnetwork.dk</span>
                            </a>
                            <span className="hidden sm:inline">|</span>
                            <a href="tel:+4527572437" className="hover:underline flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                <span>+45 27 57 24 37</span>
                            </a>
                        </div>
                    </div>

                    {/* Højre side - Åbningstider */}
                    <div className="mt-2 sm:mt-0 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Åbningstider: Man-Fre <b>8:00-17:00</b></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
