import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Button, Card, Col, Form, ListGroup, Row, Spinner } from "react-bootstrap";
import MapRoute from "./MapRoute";
import { useState } from "react";
import { useGlobalState } from 'state-pool';
const ViajesDetails = () => {
  const [usuario] = useGlobalState("user");
  const { id } = useParams();
  const { data: viaje, error, isPending } = useFetch('http://localhost:5000/viajes/' + id);
  const history = useHistory();
  const [numero, setNumero] = useState(0);
  const handleClick = () => {
    fetch('http://localhost:5000/viajes/' + id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    }) 
  }
  const cambiarNumero = (n)=>{
    n = n>viaje.libres?viaje.libres:n
    n = n<0?0:n
    setNumero(n)
  }
  const handleSubmit = () => {
    
  }
  return (
    <div className="blog-details">
      { isPending && <Spinner animation="border" variant="dark" /> }
      { error && <div>{ error }</div> }
      { viaje && (
        <Row className="mb-3">
          <Col>
            <Card style={{  height: '25rem' }}>
            <Card.Header><h4>{ viaje.nombre }</h4></Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><b>Viaje de:</b> { viaje.nombreConductor }</ListGroup.Item>
              <ListGroup.Item><b>Origen:</b> { viaje.origen }</ListGroup.Item>
              <ListGroup.Item><b>Destino:</b> { viaje.destino }</ListGroup.Item>
              <ListGroup.Item><b>Plazas libres:</b> {viaje.libres}</ListGroup.Item>
              <ListGroup.Item><b>Precio:</b> {viaje.precio}€</ListGroup.Item>
            </ListGroup>
            </Card>
          </Col>
          <Col >
            <MapRoute origen={{ lat: viaje.coordOrigen[0], lng: viaje.coordOrigen[1] }} destino={{ lat: viaje.coordDestino[0], lng: viaje.coordDestino[1] }}/>
          </Col>
          <Col>
          <Card style={{  height: '25rem' }}>
            <Card.Header>Reserva</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Form>
                    <Form.Label>Número de plazas</Form.Label>
                        <Form.Control type="number" min={0} max={viaje.libres} placeholder="Introduzca el número de plazas a reservar." value={numero} onChange={(e)=>cambiarNumero(e.target.value)} />
                  </Form>
                </ListGroup.Item>
                {usuario.id!==viaje.idConductor && <ListGroup.Item><b>Precio total:</b> { viaje.precio * numero }</ListGroup.Item>}
                {usuario.id===viaje.idConductor && <ListGroup.Item><b>Se trata de su viaje, las plazas reservadas no se le cobrarán, pero la reserva se registrará.</b></ListGroup.Item>}
              </ListGroup>
            </Card.Body>
            <Button onClick={()=>handleSubmit()} disabled={numero<=0}>Reservar</Button>
            {usuario.id===viaje.idConductor && <Button variant="danger" onClick={()=>handleClick()} >Eliminar Viaje</Button>}
            </Card>
            
          </Col>
        </Row>
        
      )}
    </div>
  );
}
 
export default ViajesDetails;