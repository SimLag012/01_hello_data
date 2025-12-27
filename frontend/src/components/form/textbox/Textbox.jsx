import './Textbox.css';

function Textbox({ id, name, value, onChange, placeholder }) {
    return(
        <div className="textbox-container">
            <input 
                type="text" 
                className="textbox-input" 
                id={id} 
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

export default Textbox;   
