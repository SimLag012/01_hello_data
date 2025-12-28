import './Textbox.css';

function Textbox({ id, name, value, onChange, placeholder, icon, label, type = "text" }) {
    return(
        <div className="textbox-wrapper">
            {label && <label htmlFor={id} className="label-text">{label}</label>}
            <div className="textbox-container">
                {icon && <div className="textbox-icon">{icon}</div>}
                <input 
                    type={type} 
                    className="textbox-input" 
                    id={id} 
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}

export default Textbox;   

