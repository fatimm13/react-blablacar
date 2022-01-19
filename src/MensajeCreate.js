import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import { useGlobalState} from 'state-pool';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";



const MensajeCreate = () => {
    
    const [contenido, setContenido] = useState("");
    const [user] = useGlobalState("user");
    const [token] = useGlobalState("token");
    const { id } = useParams();
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleSubmit = ()=>{
        if(contenido!==""){
            
            const body = {"creador":user.id,"destino":id,"contenido":contenido}
        
            fetch('https://flaskhalfwayhome.herokuapp.com/mensajes', {
                method: 'POST',
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(body)
            })
            .then(res => {
                if (!res.ok) { // error coming back from server
                throw Error('could not fetch the data for that resource');
                }
            
                return res.json();
            })
            .then(data => {
                window.location.reload();
                
            })
            .catch(err => {
                setError(err.name);
            })

            
        }
        
    }
    
    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl placeholder="Escribir mensaje..." aria-label="Escribir mensaje" aria-describedby="basic-addon2" value={contenido} onChange={(e)=>{setContenido(e.target.value)}} />
                <Button onClick={handleSubmit} variant="outline-secondary" id="button-addon2"> Enviar </Button>
            </InputGroup>

            {error && <div>{error}</div>}

        </div>
        
    );
}

export default MensajeCreate;