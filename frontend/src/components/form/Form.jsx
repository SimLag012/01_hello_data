import './Form.css'
import Textbox from './textbox/Textbox';
import Select from './select/Select';
import Button from './button/Button';
import { useState } from 'react';

const NumberIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 3L6 21M18 3L14 21M4 8h16M4 16h16" />
    </svg>
);

function Form() {
    const [numbers, setNumbers] = useState(['', '', '']);
    const [operation, setOperation] = useState('');
    const [result, setResult] = useState(null);

    const operationOptions = [
        { label: 'Somma', value: 'sum' },
        { label: 'Media', value: 'average' },
        { label: 'Massimo e Minimo', value: 'maxmin' },
    ];

    const handleNumberChange = (index, value) => {
        const newNumbers = [...numbers];
        newNumbers[index] = value;
        setNumbers(newNumbers);
    };

    const addNumberField = () => {
        setNumbers([...numbers, '']);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            operation: operation,
            numbers: numbers.filter(n => n !== '').map(Number)
        };
        
        console.log('Sending data:', dataToSend);
        
        try {
            const response = await fetch('http://localhost:3001/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                setResult(data.processed);
                // Optional: clear inputs? User might want to tweak numbers. Let's keep them.
            } else {
                alert('Errore: ' + (data.error || 'Errore sconosciuto'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Errore di connessione al server');
        }
    };

    return(
        <div className="form-container">
            <h1>Data Entry</h1>
            <p className="subtitle">Scegli l'operazione e inserisci i numeri per calcolare i risultati.</p>
            
            <form onSubmit={handleSubmit}>
                <Select 
                    label="OPERAZIONE"
                    id="operation"
                    name="operation"
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    options={operationOptions}
                />

                <div className="numbers-list">
                    {numbers.map((num, index) => (
                        <Textbox 
                            key={index}
                            label={index === 0 ? "LISTA NUMERI" : ""}
                            id={`num-${index}`}
                            name={`num-${index}`}
                            value={num}
                            onChange={(e) => handleNumberChange(index, e.target.value)}
                            placeholder={`Numero ${index + 1}`}
                            type="number"
                            icon={<NumberIcon />}
                        />
                    ))}
                </div>

                <div className="submit-container">
                    <Button variant="secondary" onClick={addNumberField}>
                        + Aggiungi un altro numero
                    </Button>

                    <Button type="submit" variant="primary">
                        Calcola Risultato
                    </Button>
                </div>

                {result !== null && (
                    <div className="result-container">
                        <span className="result-label">Risultato</span>
                        <div className="result-value">
                            {Array.isArray(result) 
                                ? `Min: ${result[0]} | Max: ${result[1]}` 
                                : Number(result).toFixed(2).replace(/[.,]00$/, "")}
                        </div>
                    </div>
                )}
            </form>
        </div>
    );

}


export default Form;

