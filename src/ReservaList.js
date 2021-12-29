import { Card, ListGroup, Button, Row, Col, Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useGlobalState } from 'state-pool';
import { useState } from "react";

const ReservaList = ({ reservas }) => {
  const [usuario] = useGlobalState("user");
  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const goTo = (url)=>{
    history.push(url)
  
  } 
  const handleClick = (url) => {
    fetch(url, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    }) 
  }
  
  return (
    <Row xs={1} md={4} className="g-4">
      {reservas.map(reserva => (
        <Col>
          <Card className="bg-light" style={{ width: '18rem', height: '100%' }}>
            <Card.Body>
              <Card.Title><h4>{ reserva.nombre }</h4></Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item><b>Plazas reservadas:</b> {reserva.reservadas}</ListGroup.Item>
                <ListGroup.Item><b>Hora:</b> {new Date(reserva.horaDeSalida).toLocaleTimeString("es-ES")}</ListGroup.Item>
                <ListGroup.Item><b>Fecha:</b> {new Date(reserva.horaDeSalida).toLocaleDateString("es-ES")}</ListGroup.Item>
                <ListGroup.Item><b>Precio/plaza:</b> {reserva.precio}€</ListGroup.Item>
                <ListGroup.Item><b>Origen:</b> { reserva.origen }</ListGroup.Item>
                <ListGroup.Item><b>Destino:</b> { reserva.destino }</ListGroup.Item>
                <ListGroup.Item><b>Viaje de:</b> { reserva.nombreConductor }</ListGroup.Item>
                <ListGroup.Item><b>Plazas libres:</b> {reserva.libres}</ListGroup.Item>
            </ListGroup>
            <Button variant="primary" onClick={()=>goTo("/viajes/"+ reserva.id)}>Ver detalles</Button>
            <Button variant="danger" onClick={handleShow}>Eliminar reserva</Button>
            
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Eliminar reserva</Modal.Title>
              </Modal.Header>
              <Modal.Body>¿Est&aacute;s seguro de que desea eliminar su reserva en el viaje { reserva.nombre}? </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}> Cancelar </Button>
                  <Button variant="primary" onClick={()=>handleClick('http://localhost:5000/usuarios/'+usuario.id+'/reservas/'+reserva.id)}> Borrar </Button>
              </Modal.Footer>
            </Modal>

          </Card>
        </Col>
      ))}
    </Row>
  );
}
 
export default ReservaList;