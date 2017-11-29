import sys
import numpy as np
import json

# interactions = int(sys.argv[1])
# peopleCount = float(sys.argv[2])
# attendance = float(sys.argv[3]) / 100
# drinkMin = int(sys.argv[4])
# drinkMax = int(sys.argv[5])


interactions = int(100)
peopleCount = float(25)
attendance = float(80) / 100
drinkMin = int(400)
drinkMax = int(800)

def predict():
    binomialDistribution = np.random.binomial(peopleCount,attendance,interactions).tolist()

    presentPeople = []

    for i in xrange(0,interactions):
        freq = len(list(filter(lambda val: (val == i),binomialDistribution)))
        if freq > 0:
            presentPeople.append({ 'x': i, 'y': int(freq/float(interactions)*100) })

    beerConsume = []

    uniformDistribution = np.random.uniform(drinkMin,drinkMax,interactions).tolist()

    for i in xrange(0,interactions):
        binomialValue = binomialDistribution[i]
        uniformValue = uniformDistribution[i]
        beerConsume.append(binomialValue * uniformValue)

    beerConsumeAverage = np.average(beerConsume)
    standardDeviation = np.std(beerConsume)

    minValue = min(beerConsume)
    maxValue = max(beerConsume)

    beerConsumeSeparetedInBlocks = []
    stepsCount = 15
    stepSize = (maxValue - minValue) / stepsCount

    for i in xrange(1,stepsCount):
        beerConsumeSeparetedInBlocks.append(calculateBlock(beerConsume,minValue,maxValue,stepSize,i))

    results = {
        'presentPeople': presentPeople,
        'beerConsume': beerConsume,
        'beerConsumeAverage': beerConsumeAverage,
        'standardDeviation': standardDeviation,
        'beerConsumeSeparetedInBlocks': beerConsumeSeparetedInBlocks
    }
    print(str(results))
    sys.stdout.flush()

def calculateBlock(beerConsume,minValue,maxValue,stepSize,i):
    minValueInStep = minValue + (stepSize * (i - 1))
    maxValueInStep = minValue + (stepSize * i)
    countInStep = len(list(filter(lambda val: (val >= minValueInStep) & (val < maxValueInStep),beerConsume)))
    return { 'x': minValueInStep, 'y': countInStep }

predict()
    