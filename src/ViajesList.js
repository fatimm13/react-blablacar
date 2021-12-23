import { Container, Card, ListGroup, Button } from 'react-bootstrap';

import { useHistory } from "react-router-dom";
const ViajesList = ({ viajes }) => {
  const history = useHistory();
  const goTo = (url)=>{
    history.push(url)
  } 
  return (

    <Container className="viajes-list">
      {viajes.map(viaje => (
        <div className="blog-preview" key={viaje.id} >
          <Card style={{ width: '18rem' }}>
            <Card.Header><h4>{ viaje.nombre }</h4></Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><b>Viaje de:</b> { viaje.nombreConductor }</ListGroup.Item>
              <ListGroup.Item><b>Origen:</b> { viaje.origen }</ListGroup.Item>
              <ListGroup.Item><b>Destino:</b> { viaje.destino }</ListGroup.Item>
              <ListGroup.Item><b>Plazas libres:</b> {viaje.libres}</ListGroup.Item>
              <ListGroup.Item><b>Precio:</b> {viaje.precio}€</ListGroup.Item>
            </ListGroup>
            <Button variant="primary" onClick={()=>goTo("/viajes/"+ viaje.id)}>Ver detalles</Button>
          </Card>
        </div>
      ))}
    </Container>
  );
}
 
export default ViajesList;