import { useGlobalState} from 'state-pool';
import { Container, Spinner, Image, Row, Col } from 'react-bootstrap';
import useFetchAuth from './useFetchAuth';
import useFetch from './useFetch';
import { useParams } from "react-router-dom";
import MensajeList from "./MensajeList";

function MensajesListar() {
  const { id } = useParams();
  const [user, setUser] = useGlobalState("user");
  const { error, isPending, data: mensajes } = useFetchAuth('http://localhost:5000/mensajes?creador='+user.id+"&destino="+id)
  const { error2, isPending2, data: usuario } = useFetch('http://localhost:5000/usuarios/'+id)
  return (

    <Container>
      
      <br/>
      
      { error2 && <div>{ error }</div> }
      { isPending2 && <div>LOADING <Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /></div>  }
      <Row>
            <Col md={1}>
                { usuario && <Image style={{ width: '5rem', height: '5rem' }} src={usuario.imagen} />}
            </Col>
            <Col>
                { usuario && <h1> {usuario.nombre} </h1> }
            </Col>
      </Row>
      
      <br/>

      { error && <div>{ error }</div> }
      { isPending && <div>LOADING <Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /></div>  }
      { mensajes && <MensajeList mensajes={mensajes} /> }

    </Container>
  );
}

export default MensajesListar;