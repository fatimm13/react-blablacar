import { Card, Button, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

const UsuarioList = ({ usuarios }) => {

    return (

        <Row>
            {usuarios.map(usuario =>{
                return (
                    <div key= {usuario.id} className="col-md-4 ">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://res.cloudinary.com/dugtth6er/image/upload/v1639832477/perfil_hont25.png" />
                            <Card.Body>
                                <Card.Title>{ usuario.nombre}</Card.Title>
                                <Card.Text> { usuario.descripcion} </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem><b>Edad:</b> { usuario.edad} </ListGroupItem>
                                <ListGroupItem><b>Localidad:</b> { usuario.ubicacion} </ListGroupItem>
                                <ListGroupItem><b>Fecha de inscripci&oacute;n:</b> {new Date(usuario.fecha).toLocaleDateString("es-ES")}  </ListGroupItem>
                            </ListGroup>
                            <Button variant="primary">Seleccionar</Button>
                            <Button variant="danger">Eliminar</Button>
                        </Card>
                    </div>
                )
            })}
        </Row>

    )
}

export default UsuarioList;