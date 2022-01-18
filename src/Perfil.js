import { Card, Col, Button, ListGroup, ListGroupItem, Row, Image, Modal, Form, Container } from 'react-bootstrap';
import { useGlobalState } from 'state-pool';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { getAuth  } from "firebase/auth";

const Perfil = () => {
    const [usuario, setUser] = useGlobalState("user");
    const [token, setToken] = useGlobalState("token");

    const history = useHistory();
    const [file, setFile] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleDelete = ()=>{
        let auth = getAuth();
        let user = auth.currentUser;

        if(user){
            
            fetch('http://localhost:5000/usuarios/'+usuario.id, {
            method: 'DELETE',
            headers: {"Authorization": `Bearer ${token}` }
            }).then(() => {
                history.push('/');

                setUser(null);
                setToken(null);
            })
            .catch((error) => {
                console.log(error)
            });
        }else{
            history.push('/error');
            setUser(null);
        }

    }

    const handleFileSelected = (e) => {
        const files = Array.from(e.target.files)
        setFile(files[0])
        console.log("files:", files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();   
        formData.append("file", file)
        formData.append("id",usuario.id);
        fetch('http://localhost:5000/usuarios/'+usuario.id+'/foto', {
          method: 'PUT',
          headers: {"Authorization": `Bearer ${token}` },
          body: formData
        }).then((res) => {
          // history.go(-1);
          return res.json()
        
        }).then((data) =>{
          let nuevo = { id: usuario.id,
                        nombre: usuario.nombre,
                        edad: usuario.edad,
                        ubicacion: usuario.ubicacion,
                        descripcion: usuario.descripcion,
                        imagen: data,
                        fecha: usuario.fecha};
          setUser(nuevo);
        })
    }

    const handleDeleteFoto = () => { 
        fetch('http://localhost:5000/usuarios/'+usuario.id+'/foto', {
          method: 'DELETE',
          headers: {"Authorization": `Bearer ${token}` }
        }).then(() => {
            // history.push('/');
            let nuevo = { id: usuario.id,
                nombre: usuario.nombre,
                edad: usuario.edad,
                ubicacion: usuario.ubicacion,
                descripcion: usuario.descripcion,
                imagen: "https://res.cloudinary.com/dugtth6er/image/upload/v1639832477/perfil_hont25.png",
                fecha: usuario.fecha};
            setUser(nuevo);
        })
    }

    return ( 
        
        <Container>
            <h2>Datos de { usuario.nombre}</h2>
            <br/>
            <Row className="mb-3">
                <Col>
                    <Card style={{ width: '90%', height: '78%' }}>
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
                        <Button variant="success" href="editPerfil">Editar datos del perfil</Button>
                    </Card>

                    <Card style={{ width: '90%' }}>
                        <Button variant="primary" href="viajesCreados">Ver viajes creados</Button>
                    </Card>

                    <Card style={{ width: '90%' }}>
                        <Button variant="primary" href="reservas">Ver viajes reservados</Button>
                    </Card>

                    <Card style={{ width: '90%' }}>
                        <Button variant="danger" onClick={handleShow}>Eliminar perfil</Button>
                    </Card>

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
                </Col>
                
                <Col>
                    <Image style={{ width: '25rem', height: '25rem' }} src={usuario.imagen} />
                    <br/>
                    <br/>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Selecciona una nueva foto de perfil:</Form.Label>
                            <Form.Control type="file" accept=".png, .jpg, .jpeg" name="imagen" onChange={(e)=>handleFileSelected(e)} />
                        </Form.Group>
                        <Button variant="success" type="submit"> Actualizar foto de perfil </Button>
                        <Button variant="danger" type="reset" onClick={handleDeleteFoto}> Borrar foto de perfil </Button>
                    </Form>
                    
                </Col>
            </Row>
        </Container>
     );
}
 
export default Perfil;