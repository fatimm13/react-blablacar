import { useState, useEffect } from 'react'
import UsuarioList from './UsuarioList'
import { Container, Col, Row } from 'react-bootstrap';

function UsuariosListar() {

  const [usuarios, setUsuarios] = useState([]);

  // Modify the current state by setting the new data to
  // the response from the backend

  useEffect(()=>{
    fetch('http://localhost:5000/usuarios',{
      'methods':'GET',
      headers : { 'Content-Type':'application/json' }
    })
    .then(response => response.json())
    .then(response => setUsuarios(response))
    .catch(error => console.log(error))
  },[])


  return (

    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto"><h1>Lista de usuarios disponibles:</h1></Col>
      </Row>
      
      <Row>
        <Col>
          <a href="/crearUsuario" type="button" className="btn btn-primary">
            Crear usuario
          </a>
        </Col>
      </Row>

      <br/>

      <UsuarioList usuarios={usuarios} />

    </Container>
  );
}

export default UsuariosListar;