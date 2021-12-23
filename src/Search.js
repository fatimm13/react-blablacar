import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import ViajesListarUrl from './ViajesListarUrl';

const Search = () => {
    const [nombre,setNombre] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = ()=>{
        setUrl(`http://127.0.0.1:5000/viajes?nombre=${nombre}`)
    }
    
    return (
        <div>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">🔎</InputGroup.Text>
                <FormControl placeholder="Buscar nombre" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(e)=>{setNombre(e.target.value)}} />
                <Button onClick={handleSubmit} variant="outline-secondary" id="button-addon2"> Buscar </Button>
            </InputGroup>
            
            { url!=="" &&
                <ViajesListarUrl url={url}></ViajesListarUrl>
            }
            
        </div>
    );
}
 
export default Search;