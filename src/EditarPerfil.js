import { useState } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useGlobalState } from 'state-pool';
import { useHistory } from "react-router-dom";

const EditarPerfil = () => {

  const [usuario, setUser] = useGlobalState("user");

  const [nombre, setNombre] = useState(usuario.nombre);
  const [edad, setEdad] = useState(usuario.edad);
  const [ubicacion, setUbicacion] = useState(usuario.ubicacion);
  const [descripcion, setDescripcion] = useState(usuario.descripcion);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {nombre, edad, ubicacion, descripcion};

    fetch('http://localhost:5000/usuarios/'+usuario.id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(() => {
      // history.go(-1);
      let nuevo = {id: usuario.id, nombre: nombre, edad: edad, ubicacion: ubicacion, descripcion: descripcion, imagen: usuario.imagen, fecha: usuario.fecha};
      setUser(nuevo);
      history.push('/perfil');
    })
  }

  return (
    <div className="updateUsuario">
      <h1>Editar usuario</h1>
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Introduzca su nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} required/>
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

            <Button variant="primary" type="submit"> Actualizar </Button>

        </Form>
      </div>
    </div>
  );
}
 
export default EditarPerfil;