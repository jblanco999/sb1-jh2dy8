"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Star } from "lucide-react";

const formSchema = z.object({
  licensePlate: z
    .string()
    .min(6, "La patente debe tener al menos 6 caracteres")
    .max(7, "La patente no puede tener más de 7 caracteres"),
});

export function TaxiRatingForm() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licensePlate: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (rating === 0) {
      toast({
        title: "Error",
        description: "Por favor selecciona una calificación",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log({ ...values, rating });
    
    toast({
      title: "¡Calificación enviada!",
      description: `Has calificado al taxi ${values.licensePlate} con ${rating} estrellas.`,
    });

    form.reset();
    setRating(0);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="licensePlate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patente del Taxi</FormLabel>
              <FormControl>
                <Input placeholder="ABC123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Calificación</FormLabel>
          <div className="flex gap-1">
            {[...Array(10)].map((_, index) => (
              <button
                key={index}
                type="button"
                className="focus:outline-none"
                onClick={() => setRating(index + 1)}
                onMouseEnter={() => setHoveredRating(index + 1)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <Star
                  className={`h-6 w-6 ${
                    index < (hoveredRating || rating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-zinc-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Enviar Calificación
        </Button>
      </form>
    </Form>
  );
}