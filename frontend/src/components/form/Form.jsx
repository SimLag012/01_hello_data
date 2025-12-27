import './Form.css'
import Textbox from './textbox/Textbox';

import { useState } from 'react';

function Form() {
    const [formData, setFormData] = useState({
        data: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Sending data:', formData);
        
        try {
            const response = await fetch('http://localhost:3001/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Dati inviati con successo!');
                setFormData({ data: '' }); // Reset form
            } else {
                alert('Errore nell\'invio dei dati');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Errore di connessione al server');
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <Textbox 
                id="data" 
                name="data" 
                value={formData.data} 
                onChange={handleChange} 
                placeholder="Inserisci i tuoi dati qui..."
            />
            <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>Invia</button>
        </form>
    );
}

export default Form;