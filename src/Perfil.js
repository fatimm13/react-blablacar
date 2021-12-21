import { Card, Col, Button, ListGroup, ListGroupItem, Row, Image } from 'react-bootstrap';
import {useGlobalState} from 'state-pool';
import { useHistory } from "react-router-dom";
const Perfil = () => {
    const [usuario,setUser] = useGlobalState("user");
    const history = useHistory();

    const handleDelete = () => {
        
    
        fetch('http://localhost:5000/usuarios/'+usuario.id, {
          method: 'DELETE'
        }).then(() => {
            setUser(null);
            history.push('/');
        })
    }
    return ( 
        
        <Row className="mb-3">
            <Col md={{ span: 3, offset: 1 }}><Image style={{ width: '30rem', height: '30rem' }} src={usuario.imagen} /></Col>
            <Col></Col>
            <Col md={{ span: 5 }}>
                <Card style={{ width: '30rem', height: '30rem' }}>
                    
                    <Card.Body>
                        <Card.Title>{ usuario.nombre}</Card.Title>
                        <Card.Text> { usuario.descripcion} </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem><b>Edad:</b> { usuario.edad} </ListGroupItem>
                        <ListGroupItem><b>Localidad:</b> { usuario.ubicacion} </ListGroupItem>
                        <ListGroupItem><b>Fecha de inscripci&oacute;n:</b> {new Date(usuario.fecha).toLocaleDateString("es-ES")}  </ListGroupItem>
                    </ListGroup>
                    <Button variant="primary">Editar</Button>
                    <Button variant="danger">Eliminar</Button>
                </Card>
            </Col>
        </Row>
     );
}
 
export default Perfil;