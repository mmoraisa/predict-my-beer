import sys
import numpy as np

interactions = int(sys.argv[1])
peopleCount = float(sys.argv[2])
attendance = float(sys.argv[3]) / 100

def predict():
    results = {
        'interactions': interactions,
        'peopleCount': peopleCount,
        'attendance': attendance,
        'bin': np.random.binomial(peopleCount,attendance,interactions)
    }
    print(str(results))
    sys.stdout.flush()

predict()
    