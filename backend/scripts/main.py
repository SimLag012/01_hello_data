import sys
import json
import maxmin

try:
    function, n, data = sys.argv[1], sys.argv[2], None

    match function:
        case "1":
            data = maxmin(n)
    
    
    # Creiamo una risposta JSON
    response = {
        "original": [function, n],
        "processed": data,
        "status": "success" if data is not None else "error"
    }
    

    print(json.dumps(response))

except Exception as e:
    print(json.dumps({"error": str(e)}))
