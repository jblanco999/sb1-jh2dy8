"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TaxiRating {
  licensePlate: string;
  averageRating: number;
  totalRatings: number;
}

// Simulated data - In a real app, this would come from a database
const mockTaxiData: Record<string, TaxiRating> = {
  "ABC123": {
    licensePlate: "ABC123",
    averageRating: 4.5,
    totalRatings: 28
  },
  "XYZ789": {
    licensePlate: "XYZ789",
    averageRating: 3.8,
    totalRatings: 15
  }
};

export function SearchTaxi() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<TaxiRating | null>(null);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const normalizedQuery = searchQuery.toUpperCase().trim();
    const result = mockTaxiData[normalizedQuery];

    if (result) {
      setSearchResult(result);
    } else {
      toast({
        title: "Taxi no encontrado",
        description: "No hay calificaciones para este taxi todavía.",
        variant: "destructive"
      });
      setSearchResult(null);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          placeholder="Ingresa la patente del taxi"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>
      </form>

      {searchResult && (
        <div className="bg-yellow-50 dark:bg-zinc-800 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">
              Taxi {searchResult.licensePlate}
            </h3>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-semibold">
                {searchResult.averageRating.toFixed(1)}
              </span>
            </div>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Basado en {searchResult.totalRatings} calificaciones
          </p>
        </div>
      )}
    </div>
  );
}