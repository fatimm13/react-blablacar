import { Card, Col, Button, ListGroup, ListGroupItem, Row, Image, Modal, Form, Container } from 'react-bootstrap';
import { useGlobalState } from 'state-pool';
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Perfil = () => {
    const [usuario, setUser] = useGlobalState("user");
    const history = useHistory();

    const [imagen, setImagen] = useState(usuario.imagen);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => { 
        fetch('http://localhost:5000/usuarios/'+usuario.id, {
          method: 'DELETE'
        }).then(() => {
            history.push('/');
            setUser(null);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {imagen};
    
        fetch('http://localhost:5000/usuarios/'+usuario.id+'/foto', {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }).then(() => {
          // history.go(-1);
          let nuevo = {nombre: usuario.nombre,
                        edad: usuario.edad,
                        ubicacion: usuario.ubicacion,
                        descripcion: usuario.descripcion,
                        imagen: imagen,
                        fecha: usuario.fecha};
          setUser(nuevo);
          history.push('/perfil');
        })
      }

    return ( 
        
        <Container>
            <Row className="mb-3">
                <Col>
                    <h2>Datos de { usuario.nombre}</h2>
                    <br/>
                    <Card style={{ width: '30rem', height: '30rem' }}>
                        <Card.Body>
                            <Card.Title>Descripci&oacute;n:</Card.Title>
                            <br/>
                            <Card.Text> { usuario.descripcion} </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem><b>Edad:</b> { usuario.edad} </ListGroupItem>
                            <ListGroupItem><b>Localidad:</b> { usuario.ubicacion} </ListGroupItem>
                            <ListGroupItem><b>Fecha de inscripci&oacute;n:</b> {new Date(usuario.fecha).toLocaleDateString("es-ES")}  </ListGroupItem>
                        </ListGroup>
                        <Button variant="primary" href="editPerfil">Editar datos</Button>
                        <Button variant="danger" onClick={handleShow}>Eliminar perfil</Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Eliminar usuario</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>¿Est&aacute;s seguro de que desea eliminar el usuario { usuario.nombre}? </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}> Cancelar </Button>
                                <Button variant="primary" onClick={handleDelete}> Borrar </Button>
                            </Modal.Footer>
                        </Modal>
                    </Card>
                </Col>
                
                <Col>
                    <Image style={{ width: '30rem', height: '30rem' }} src={usuario.imagen} />
                    <br/>
                    <br/>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Selecciona una nueva foto de perfil</Form.Label>
                            <Form.Control type="file" accept=".png, .jpg, .jpeg" name="imagen" onChange={(e)=>setImagen(e.target.value)} />
                        </Form.Group>
                        <Button variant="success" type="submit"> Actualizar foto de perfil </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
     );
}
 
export default Perfil;