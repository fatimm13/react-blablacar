import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import ViajesListarUrl from './ViajesListarUrl';

const Search = () => {
    const [url, setUrl] = useState("http://localhost:5000/viajes");
    
    const [nombre, setNombre] = useState("");
    const [origen, setOrigen] = useState("");
    const [destino, setDestino] = useState("");
    const [libres, setLibres] = useState(0);
    const [precio, setPrecio] = useState(0);

    const limpiarFiltro = ()=>{
        setNombre("");
        setOrigen("");
        setDestino("");
        setLibres(0);
        setPrecio(0);
        setUrl("http://localhost:5000/viajes");
    }

    const handleSubmit = ()=>{
        let u = `http://127.0.0.1:5000/viajes?nombre=${nombre}`

        if(origen!==""){
            u = u + `&origen=${origen}`
        }

        if(destino!==""){
            u = u + `&destino=${destino}`
        }

        if(libres>0){
            u = u + `&libres=${libres.toString()}`
        }

        if(precio>0){
            u = u + `&precio=${precio.toString()}`
        }
        
        setUrl(u)
    }
    
    return (
        <div>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">🔎</InputGroup.Text>
                <FormControl placeholder="Buscar nombre" aria-label="Recipient's username" aria-describedby="basic-addon2" value={nombre} onChange={(e)=>{setNombre(e.target.value)}} />
                <Button onClick={handleSubmit} variant="outline-success" id="button-addon2"> Buscar </Button>
                <Button onClick={limpiarFiltro} variant="outline-danger" id="button-addon2"> Limpiar Filtro </Button>
            </InputGroup>
            <InputGroup>
                <Form.Group controlId="formLibres">
                    <Form.Label>Plazas libres</Form.Label>
                    <Form.Control type="number" placeholder="Introduzca las plazas disponibles." value={libres} onChange={(e)=>setLibres(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formPrecio">
                    <Form.Label>Precio por plaza</Form.Label>
                    <Form.Control type="number" placeholder="Introduzca el precio por plaza del vehiculo." value={precio} onChange={(e)=>setPrecio(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formOrigen">
                    <Form.Label>Origen</Form.Label>
                    <Form.Control type="text" placeholder="Introduzca el origen" value={origen} onChange={(e)=>setOrigen(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formDestino">
                    <Form.Label>Destino</Form.Label>
                    <Form.Control type="text" placeholder="Introduzca el destino" value={destino} onChange={(e)=>setDestino(e.target.value)} />
                </Form.Group>
            </InputGroup>
            <br/>
            <br/>
            
            { url!=="" && <ViajesListarUrl url={url}></ViajesListarUrl>}
            
        </div>
    );
}
 
export default Search;