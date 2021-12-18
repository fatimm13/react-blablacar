import { useState } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';

import APIService from './APIService'


const CreateUsuario = (props) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [edad, setEdad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  

  const insertUsuario = () =>{
    APIService.InsertUsuario({nombre, email, contrasena, edad, ubicacion, descripcion})
    .then((response) => props.insertedUsuario(response))
    .catch(error => console.log('error',error))
  }

  const handleSubmit=(event)=>{ 
    event.preventDefault()
    insertUsuario()
    setNombre('')
    setEmail('')
    setContrasena('')
    setEdad('')
    setUbicacion('')
    setDescripcion('')
  }

  return (
    <div className="createUsuario">
      <h1>Registrar usuario</h1>
      <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Introduzca su nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="Introduzca su correo electrónico" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Introduzca su contraseña" value={contrasena} onChange={(e)=>setContrasena(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>Repita su contraseña</Form.Label>
                <Form.Control type="password" placeholder="Repita la contraseña anterior" />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="formEdad">
                    <Form.Label>Edad</Form.Label>
                    <Form.Control type="number" placeholder="Introduzca su edad" value={edad} onChange={(e)=>setEdad(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formLocalidad">
                    <Form.Label>Localidad en la que vive</Form.Label>
                    <Form.Control type="text" placeholder="Introduzca su localidad" value={ubicacion} onChange={(e)=>setUbicacion(e.target.value)} />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="controlTextarea">
                <Form.Label>Breve descripción</Form.Label>
                <Form.Control as="textarea" rows={3} value={descripcion} onChange={(e)=>setDescripcion(e.target.value)} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Acepta los términos y condiciones" required />
            </Form.Group>

            <Button variant="primary" type="submit"> Registrar </Button>
        </Form>
    </div>
  );
}
 
export default CreateUsuario;