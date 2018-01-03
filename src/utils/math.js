const PD = require("probability-distributions")

const calculatePresentPeople = (binDistrib,interactions) => {
    const presentPeople = []
    
    let len
    for(let i = 1; i <= interactions; i++){
        len = binDistrib.filter(_ => _ === i).length
        if(len > 0)
            presentPeople.push({ x: i, y: (len / interactions * 100) })
    }

    return presentPeople
}

const calculateBeerConsume = (binDistrib,unifDistrib) => {
    const beerConsume = []
    
    let uniformValue;
    binDistrib.forEach((binomialValue,i) => {
        uniformValue = unifDistrib[i];
        beerConsume[i] = binomialValue * uniformValue
    });

    return beerConsume
}

const calculateAverage = data => data.reduce((acc,val) => acc+val,0) / data.length

const calculateStdDeviation = data => {
    const avg = calculateAverage(data)
    return Math.sqrt(data.reduce((acc,val) => acc + Math.pow(val-avg,2),0) / data.length)
}

const getMinValue = dataArray => {
    let minValue = dataArray[0]

    for(let val of dataArray)
        if(val < minValue)
            minValue = val
    
    return minValue
}

const getMaxValue = dataArray => {
    let maxValue = dataArray[0]

    for(let val of dataArray)
        if(val > maxValue)
            maxValue = val
    
    return maxValue
}

const separateBeerConsumeInBlocks = (beerConsume,beerConsumeAverage,standardDeviation) => {
    const minValue = Math.round(getMinValue(beerConsume))
    const maxValue = Math.round(getMaxValue(beerConsume))

    const beerConsumeSeparatedInBlocks = [];

    const stepsCount = 15;
    const stepSize = (maxValue - minValue) / stepsCount;

    const calculateBlock = (beerConsume,minValue,maxValue,stepSize,i) => {
        const minValueInStep = minValue + stepSize * (i - 1)
        const maxValueInStep = minValue + stepSize * i
        const countInStep = beerConsume.filter(_ => _ >= minValueInStep && _ < maxValueInStep).length
        return { x: minValueInStep, y: countInStep }
    }

    for(let i = 1; i <= stepsCount; i++){
        beerConsumeSeparatedInBlocks.push(calculateBlock(beerConsume,minValue,maxValue,stepSize,i))
    }

    return beerConsumeSeparatedInBlocks
}

const predict = (interactions,peopleCount,attendance,drinkMin,drinkMax) => {
    const binomialDistribution = PD.rbinom(interactions, peopleCount, attendance)
    const uniformDistribution = PD.runif(interactions, drinkMin, drinkMax)

    const presentPeople = calculatePresentPeople(binomialDistribution,interactions)
    const beerConsume = calculateBeerConsume(binomialDistribution,uniformDistribution)

    const beerConsumeAverage = calculateAverage(beerConsume)
    const standardDeviation = calculateStdDeviation(beerConsume)

    const beerConsumeSeparatedInBlocks = separateBeerConsumeInBlocks(beerConsume,beerConsumeAverage,standardDeviation)

    return {
        presentPeople,
        beerConsumeAverage,
        standardDeviation,
        beerConsumeSeparatedInBlocks,
        beerConsume
    };
}

export default predict