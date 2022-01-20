import { Container, Col, Row, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import Mensajeria from './Mensajeria';

const SearchMensajeria = () => {

  const [url, setUrl] = useState("https://flaskhalfwayhome.herokuapp.com/usuarios");
  const [nombre, setNombre] = useState("");

  const limpiarFiltro = ()=>{
    setNombre("");
    setUrl("https://flaskhalfwayhome.herokuapp.com/usuarios");
  }

  const handleSubmit = ()=>{
    let u
    if (nombre === "") {
        u = `https://flaskhalfwayhome.herokuapp.com/usuarios` 
    } else {
        u = `https://flaskhalfwayhome.herokuapp.com/usuarios?nombre=${nombre}` 
    }
    setUrl(u)
  }
  
  return (

    <Container>

        <Row className="justify-content-md-center">
            <Col md="auto"><h1>Lista de usuarios disponibles:</h1></Col>
        </Row>

        <br/>

        <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">🔎</InputGroup.Text>
            <FormControl placeholder="Buscar nombre" aria-label="Recipient's username" aria-describedby="basic-addon2" value={nombre} onChange={(e)=>{setNombre(e.target.value)}} />
            <Button onClick={handleSubmit} variant="outline-success" id="button-addon2"> Buscar </Button>
            <Button onClick={limpiarFiltro} variant="outline-danger" id="button-addon2"> Limpiar Filtro </Button>
        </InputGroup>

        <br/>
        
        { url!=="" && <Mensajeria url={url}/>}

    </Container>
  );
}

export default SearchMensajeria;