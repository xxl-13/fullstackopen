import express from 'express'
import { bmiCalculator } from './bmiCalculator'
import { exerciseCalculator } from './exerciseCalculator'

const app = express()
app.use(express.json())

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.get('/bmi', (req, res)=> {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' })
  }
  else {
    const bmi = bmiCalculator(height, weight)
    res.json({ height, weight, bmi })
  }
})

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body
  
    if (!daily_exercises || !target) {
        res.status(400).json({ error: 'parameters missing' })
    }
  
    if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
       res.status(400).json({ error: 'malformatted parameters' })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dailyExercises = daily_exercises.map((exercise: any) => Number(exercise))
    if (dailyExercises.some(isNaN)) {
       res.status(400).json({ error: 'malformatted parameters' })
    }
  
    const result = exerciseCalculator(dailyExercises, Number(target))
    res.json(result)
  })

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})