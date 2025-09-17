const express = require("express")
const cors = require("cors")

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

let movies = [
   {
  "id": 1,
  "title": "Inception",
  "director": "Christopher Nolan",
  "year": 2010
},
{
  "id": 2,
  "title": "Superman",
  "director": "James Gunn",
  "year": 2025
}
]

app.get("/movies", (req, res) => {
    res.json(movies)
})

app.post("/movies", (req, res) => {
    const { title, director, year } = req.body
    const newMovie = { id: Date.now(), title, director, year }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})

app.delete("/movies/:id", (req, res) => {
  const id = Number(req.params.id)
  movies = movies.filter(m => m.id !== id)
  res.status(204).end()
})

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`))