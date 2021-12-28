import {  Card, ListGroup, Button, Row } from 'react-bootstrap';

import { useHistory } from "react-router-dom";
const ViajesList = ({ viajes }) => {
  const history = useHistory();
  const goTo = (url)=>{
    history.push(url)
  } 
  return (

    <Row >
      {viajes.map(viaje => (
        <div className="col-md-4" key={viaje.id} >
          <br/>
          <Card style={{ width: '18rem' }}>
            <Card.Header><h4>{ viaje.nombre }</h4></Card.Header>
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
          
        </div>
      ))}
    </Row>
  );
}
 
export default ViajesList;