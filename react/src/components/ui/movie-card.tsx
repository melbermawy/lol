import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MovieCardProps {
id: number
poster: string
title: string
director: string
year: number | string
}

interface HandleDelete {
  (id: number): void;
}

type Movie = {
  id: number,
  poster: string,
  title: string,
  director: string,
  year: number
}

export default function MovieCard({id, title, director, year, poster}: MovieCardProps) {

  const [movies, setMovies] = useState<Movie[]>([])
    const API = "http://localhost:3001"


const handleDelete: HandleDelete = (id) => {
  fetch(`${API}/messages/${id}`, { method: "DELETE"})
    .then(res => setMovies(prev => prev.filter(m => m.id !== id)));
};
return(
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      <CardContent className="gap-y-4 gap-x-5">
          <div>
             <img src={poster} className="object-contain aspect-9/16"></img>
          </div>
        <h2>
            {director} - {year}
        </h2>
        <Button className="gap-y-4 gap-x-5 field-sizing-fixed w-30" onClick={() => {
          handleDelete(id)
          console.log("clicked")}}>Delete</Button>
      </CardContent>
      </CardHeader>
    </Card>
)
}
