import {  Card, ListGroup, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
const ViajesList = ({ viajes }) => {
  const history = useHistory();
  const goTo = (url)=>{
    history.push(url)
  } 
  return (

    <Row xs={1} md={4} className="g-4">
      {viajes.map(viaje => (
        <Col>
          <Card className="bg-light" style={{ width: '20rem', height: '100%' }}>
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
            <Button variant="primary" onClick={()=>goTo("/viajes/"+ viaje.id)}>Ver detalles</Button>
          </Card>
          
        </Col>
      ))}
    </Row>
  );
}
 
export default ViajesList;