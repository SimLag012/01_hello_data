const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

const { spawn } = require('child_process');

// ... (rest of imports)

app.post('/api/data', (req, res) => {
    const data = req.body.data; // Assumiamo che il frontend mandi { data: "..." }
    console.log('Node received:', data);
    
    // 1. Lanciamo lo script Python
    // 'python3' è il comando, ['server/script.py', data] sono gli argomenti
    const pythonProcess = spawn('python3', ['server/script.py', data]);
    
    let pythonData = '';

    // 2. Ascoltiamo cosa dice Python (stdout)
    pythonProcess.stdout.on('data', (chunk) => {
        pythonData += chunk.toString();
    });

    // 3. Gestiamo eventuali errori di Python (stderr)
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
    });

    // 4. Quando Python finisce, mandiamo la risposta al Frontend
    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}, ecco i dati: ${pythonData}`);
        try {
            const result = JSON.parse(pythonData);
            res.json(result);
        } catch (e) {
            res.status(500).json({ error: "Errore nel parsing della risposta Python" });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
