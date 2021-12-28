import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useGlobalState } from 'state-pool';

const ReservaList = ({ reservas }) => {
  const [usuario] = useGlobalState("user");
  const history = useHistory();
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

    <Container className="viajes-list">
      {reservas.map(reserva => (
        <div className="blog-preview" key={reserva.id} >
          <Card style={{ width: '18rem' }}>
            <Card.Header><h4>{ reserva.nombre }</h4></Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item><b>Plazas reservadas:</b> {reserva.reservadas}</ListGroup.Item>
            </ListGroup>
            <ListGroup variant="flush">
              <ListGroup.Item><b>Viaje de:</b> { reserva.nombreConductor }</ListGroup.Item>
              <ListGroup.Item><b>Origen:</b> { reserva.origen }</ListGroup.Item>
              <ListGroup.Item><b>Destino:</b> { reserva.destino }</ListGroup.Item>
              <ListGroup.Item><b>Plazas libres:</b> {reserva.libres}</ListGroup.Item>
              <ListGroup.Item><b>Precio:</b> {reserva.precio}€</ListGroup.Item>
            </ListGroup>
            <Button variant="primary" onClick={()=>goTo("/viajes/"+ reserva.id)}>Ver detalles</Button>
            <Button variant="danger" onClick={()=>handleClick('http://localhost:5000/usuarios/'+usuario.id+'/reservas/'+reserva.id)} >Eliminar Reserva</Button>

          </Card>
        </div>
      ))}
    </Container>
  );
}
 
export default ReservaList;