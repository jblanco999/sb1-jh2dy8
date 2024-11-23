import { SearchTaxi } from "@/components/search-taxi";
import { TaxiRatingForm } from "@/components/taxi-rating-form";
import { Taxi } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="flex items-center space-x-3">
            <Taxi className="h-12 w-12 text-yellow-500" />
            <h1 className="text-4xl font-bold text-zinc-800 dark:text-white">TaxiRate</h1>
          </div>
          
          <p className="text-center text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl">
            Califica tu experiencia con taxistas y consulta calificaciones antes de subir a un taxi.
            Tu seguridad es nuestra prioridad.
          </p>

          <div className="w-full max-w-4xl grid gap-8 md:grid-cols-2">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-zinc-800 dark:text-white">
                Buscar Taxi
              </h2>
              <SearchTaxi />
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-zinc-800 dark:text-white">
                Calificar Taxi
              </h2>
              <TaxiRatingForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}