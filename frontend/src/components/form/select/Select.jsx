import { useState, useRef, useEffect } from 'react';
import './Select.css';

function Select({ id, name, value, onChange, label, icon, options }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue) => {
        // Mocking the event object for parent's onChange
        onChange({
            target: {
                name: name,
                value: optionValue
            }
        });
        setIsOpen(false);
    };

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className="select-wrapper" ref={dropdownRef}>
            {label && <label className="label-text">{label}</label>}
            <div 
                className={`select-container ${isOpen ? 'active' : ''}`} 
                onClick={() => setIsOpen(!isOpen)}
            >
                {icon && <div className="select-icon">{icon}</div>}
                
                <div className={`selected-value ${!selectedOption ? 'placeholder' : ''}`}>
                    {selectedOption ? selectedOption.label : "Seleziona un'operazione..."}
                </div>

                <div className="select-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>

                {isOpen && (
                    <div className="options-dropdown">
                        {options.map((opt) => (
                            <div 
                                key={opt.value} 
                                className={`option-item ${value === opt.value ? 'selected' : ''}`}
                                onClick={() => handleSelect(opt.value)}
                            >
                                {opt.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Select;

