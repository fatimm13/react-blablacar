import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Button, Card, Col, Form, ListGroup, Row, Spinner, Modal } from "react-bootstrap";
import MapRoute from "./MapRoute";
import { useState } from "react";
import { useGlobalState } from 'state-pool';
const ViajesDetails = () => {
  const [usuario] = useGlobalState("user");
  const { id } = useParams();
  const { data: viaje, error, isPending } = useFetch('http://localhost:5000/viajes/' + id);
  const history = useHistory();
  const [numero, setNumero] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = () => {
    fetch('http://localhost:5000/viajes/' + id, {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}` },
    }).then(() => {
      history.push('/');
    }) 
  }
  const cambiarNumero = (n)=>{
    var e = n>viaje.libres?viaje.libres:n
    e = e<0?0:e
    setNumero(e)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {reservadas: parseInt(numero)};

    fetch('http://localhost:5000/usuarios/'+usuario.id+'/reservas/'+id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(body)
    }).then(() => {
      history.push('/');
    })

  }
  return (
    <div className="viajes-details">
      <h1> Detalles del viaje: </h1>
      <br/> <br/>
      { isPending && <Spinner animation="border" variant="dark" /> }
      { error && <div>{ error }</div> }
      { viaje && (
        <Row className="mb-3">
          <Col>
            <Card className="bg-light" style={{ width: '95%', height: '100%' }}>
              <Card.Body>
                <Card.Title><h4>{ viaje.nombre }</h4></Card.Title>
              </Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item><b>Viaje de:</b> { viaje.nombreConductor }</ListGroup.Item>
                <ListGroup.Item><b>Origen:</b> { viaje.origen }</ListGroup.Item>
                <ListGroup.Item><b>Destino:</b> { viaje.destino }</ListGroup.Item>
                <ListGroup.Item><b>Plazas libres:</b> {viaje.libres}</ListGroup.Item>
                <ListGroup.Item><b>Precio:</b> {viaje.precio}€</ListGroup.Item>
                <ListGroup.Item><b>Fecha:</b> {new Date(viaje.horaDeSalida).toLocaleDateString("es-ES")}</ListGroup.Item>
                <ListGroup.Item><b>Hora:</b> {new Date(viaje.horaDeSalida).toLocaleTimeString("es-ES")}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col>
            <MapRoute origen={{ lat: viaje.coordOrigen[0], lng: viaje.coordOrigen[1] }} destino={{ lat: viaje.coordDestino[0], lng: viaje.coordDestino[1] }}/>
          </Col>
          <Col>
          <Card style={{ width: '95%', height: '100%' }}>
            <Card.Header><h4>Realizar reserva:</h4></Card.Header>
            <Card.Body>
              <Form>
                <Form.Label>Número de plazas</Form.Label>
                <Form.Control type="number" min={0} max={viaje.libres} placeholder="Introduzca el número de plazas a reservar." value={numero} onChange={(e)=>cambiarNumero(e.target.value)} />
              </Form>
              <div align="right">
                <br/> <br/>
                Precio (€) por plaza: {viaje.precio} <br/>
                x {numero} <br/>
                ------------------------- <br/>
                Precio total (€): { viaje.precio * numero }
              </div>
            </Card.Body>
            <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar viaje</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>¿Est&aacute;s seguro de que desea eliminar el viaje { viaje.nombre}? </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}> Cancelar </Button>
                            <Button variant="primary" onClick={()=>handleClick()}> Borrar </Button>
                        </Modal.Footer>
              </Modal>

            <ListGroup variant="flush">
                {usuario.id!==viaje.idConductor && <ListGroup.Item><b>Precio total:</b> { viaje.precio * numero } €</ListGroup.Item>}
                {usuario.id===viaje.idConductor && <ListGroup.Item><b>Se trata de su viaje, las plazas reservadas no se le cobrarán, pero la reserva se registrará.</b></ListGroup.Item>}
            </ListGroup>
            <Button onClick={handleSubmit} disabled={ numero <= 0 || numero > viaje.libres }>Reservar</Button>
            {usuario.id===viaje.idConductor && <Button variant="danger" onClick={handleShow}>Eliminar Viaje</Button>}
            </Card>
            
          </Col>
        </Row>
        
      )}
      <br/>
      <br/>
    </div>
  );
}
 
export default ViajesDetails;