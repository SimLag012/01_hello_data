import sys
import json
from maxmin import maxmin
from average import average

try:
    operation, n_str, data = sys.argv[1], sys.argv[2], None
    n = json.loads(n_str)

    match operation:
        case "1":
            data = sum(n)
        case "2":
            data = average(n)
        case "3":   
            data = maxmin(n)    
    
    
    # Creiamo una risposta JSON
    response = {
        "original": [operation, n],
        "processed": data,
        "status": "success" if data is not None else "error"
    }
    

    print(json.dumps(response))

except Exception as e:
    print(json.dumps({"error": str(e)}))
