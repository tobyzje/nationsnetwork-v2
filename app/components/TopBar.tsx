import { Mail, Phone, Clock } from "lucide-react"

export default function TopBar() {
    return (
        <div className="bg-green-500 text-white py-2 fixed w-full top-0 z-50 hidden md:block">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                    <a href="mailto:kontakt@nationsnetwork.dk" className="flex items-center gap-2 hover:text-green-100 transition-colors">
                        <Mail className="w-4 h-4" />
                        <span className="hidden sm:inline">kontakt@nationsnetwork.dk</span>
                    </a>
                    <a href="tel:+4527572437" className="flex items-center gap-2 hover:text-green-100 transition-colors">
                        <Phone className="w-4 h-4" />
                        <span>+45 27 57 24 37</span>
                    </a>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="hidden sm:inline">Åbningstider:</span>
                    <span>Man-Fre 8:00-17:00</span>
                </div>
            </div>
        </div>
    );
}
