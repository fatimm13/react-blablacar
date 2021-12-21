import { Button } from "react-bootstrap";

const Perfil = (usuario) => {
    return ( 
        <div>
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
            <Button variant="primary">Editar</Button>
            <Button variant="danger">Eliminar</Button>
        </div>
     );
}
 
export default Perfil;