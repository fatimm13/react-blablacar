import { useState } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const CreateUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [edad, setEdad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {nombre, email, contrasena, "edad": parseInt(edad), ubicacion, descripcion};

    fetch('http://localhost:5000/usuarios', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(() => {
      // history.go(-1);
      history.push('/');
    })
  }

  return (
    <div className="createUsuario">
      <h1>Registrar usuario</h1>
      <br/>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Introduzca su nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} required/>
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" placeholder="Introduzca su correo electrónico" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Introduzca su contraseña" value={contrasena} onChange={(e)=>setContrasena(e.target.value)} required />
              </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="formEdad">
                    <Form.Label>Edad</Form.Label>
                    <Form.Control type="number" placeholder="Introduzca su edad" value={edad} onChange={(e)=>setEdad(e.target.value)} min="0" />
                </Form.Group>

                <Form.Group as={Col} controlId="formLocalidad">
                    <Form.Label>Localidad en la que vive</Form.Label>
                    <Form.Control type="text" placeholder="Introduzca su localidad" value={ubicacion} onChange={(e)=>setUbicacion(e.target.value)} />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="controlTextarea">
                <Form.Label>Breve descripción</Form.Label>
                <Form.Control as="textarea" rows={5} value={descripcion} onChange={(e)=>setDescripcion(e.target.value)} />
            </Form.Group>
            <br/>

            <Button variant="primary" type="submit"> Registrar </Button>

        </Form>
      </div>
    </div>
  );
}
 
export default CreateUsuario;