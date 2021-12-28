import { Card, Button, Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {useGlobalState} from 'state-pool';

const UsuarioList = ({ usuarios }) => {

    const [user, setUser] = useGlobalState("user");
    const history = useHistory();
    let ponerUser = (e) => {
        setUser(e)
        history.push("/listarViajes")
    }

    return (

        <Row>
            {usuarios.map(usuario =>{
                return (
                    <div key= {usuario.id} className="col-md-4 ">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={usuario.imagen} />
                            <Card.Body>
                                <Card.Title>{ usuario.nombre}</Card.Title>
                                <Card.Text> { usuario.descripcion} </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem><b>Edad:</b> { usuario.edad} </ListGroupItem>
                                <ListGroupItem><b>Localidad:</b> { usuario.ubicacion} </ListGroupItem>
                                <ListGroupItem><b>Fecha de inscripci&oacute;n:</b> {new Date(usuario.fecha).toLocaleDateString("es-ES")}  </ListGroupItem>
                            </ListGroup>
                            <Button variant="primary" onClick={()=>ponerUser(usuario)}>Seleccionar</Button>
                            
                        </Card>
                        <br/>
                    </div>
                )
            })}
        </Row>

    )
}

export default UsuarioList;