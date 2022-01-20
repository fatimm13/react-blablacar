import { Card, Col, Button, Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {useGlobalState} from 'state-pool';

const UsuarioList = ({ usuarios }) => {

    const [user, setUser] = useGlobalState("user");
    const history = useHistory();
    
    const goTo = (url)=>{
        history.push(url)
    }

    return (
        <Row md="auto" className="g-4">
            {usuarios.map(usuario =>{
                return (
                    <Col>
                        <Card style={{ width: '18rem', height: '100%' }}>
                            <Card.Img variant="top" src={usuario.imagen} style={{ width: '18rem', height: '18rem' }} />
                            <Card.Body>
                                <Card.Title>{ usuario.nombre}</Card.Title>
                                <Card.Text> { usuario.descripcion} </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem><b>Edad:</b> { usuario.edad} </ListGroupItem>
                                <ListGroupItem><b>Localidad:</b> { usuario.ubicacion} </ListGroupItem>
                                <ListGroupItem><b>Fecha de inscripci&oacute;n:</b> {new Date(usuario.fecha).toLocaleDateString("es-ES")}  </ListGroupItem>
                            </ListGroup>
                            <Button variant="primary" onClick={()=>goTo("/mensajes/" + usuario.id)}>Contactar 💬</Button>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    )
}

export default UsuarioList;