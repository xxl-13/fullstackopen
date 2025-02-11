interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const calculateRating = (average: number, target: number): { rating: number; description: string } => {
    if (average >= target) {
        return { rating: 3, description: 'Great!' }
    } else if (average >= target - 1) {
        return { rating: 2, description: 'Not too bad but could be better' }
    } else {
        return { rating: 1, description: 'work out more' }
    }
}

const exerciseCalculator = (dailyExercises: number[], target: number): Result => {
    const periodLength = dailyExercises.length
    const trainingDays = dailyExercises.filter(hours => hours > 0).length
    const totalHours = dailyExercises.reduce((sum, hours) => sum + hours, 0)
    const average = totalHours / periodLength
    const { rating, description } = calculateRating(average, target)
    
    return {
        periodLength,
        trainingDays,
        success: average >= target,
        rating,
        ratingDescription: description,
        target,
        average
    }
}

const parseArgumentsa = (args: string[]): { target: number, dailyExercises: number[] } => {
    if (args.length < 4) throw new Error('Invalid number of arguments')
    const target = Number(args[2])
    const dailyExercises = args.slice(3).map(arg => Number(arg))

    if (isNaN(target) || dailyExercises.some(isNaN)) {
        throw new Error('Provided values were not numbers!')
    }

    return {
        target,
        dailyExercises
    }
}

if (require.main === module) {
    try {
        const { target, dailyExercises } = parseArgumentsa(process.argv)
        console.log(exerciseCalculator(dailyExercises, target))
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log('Error:', e.message)
        }
    }
}

export { exerciseCalculator }
