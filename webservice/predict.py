import sys

def predict():
    results = {
        'test': float(sys.argv[1])
    }
    print(str(results))
    sys.stdout.flush()

predict()
    