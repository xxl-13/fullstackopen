const bmiCalculator = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2)
    if (bmi < 18.5) {
        return 'Underweight'
    } else if (bmi < 25) {
        return 'Normal range'
    } else if (bmi < 30) {
        return 'Overweight'
    } else {
        return 'Obese'
    }
}

const parseArguments = (args: string[]): { height: number, weight: number } => {
    if (args.length !== 4) throw new Error('Invalid number of arguments')
    const height = Number(args[2])
    const weight = Number(args[3])

    if (isNaN(height) || isNaN(weight)) {
        throw new Error('Provided values were not numbers!')
    }

    return {
        height,
        weight
    }
}

if (require.main === module) {
    try {
        const { height, weight } = parseArguments(process.argv)
        console.log(bmiCalculator(height, weight))
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log('Error:', e.message)
        }
    }
}

export { bmiCalculator }