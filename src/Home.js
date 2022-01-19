import UsuarioList from './UsuarioList'
import { Container, Col, Row, Spinner } from 'react-bootstrap';
import useFetch from './useFetch';
import Login from './Login';

function UsuariosListar(usuario) {
 
  const { error, isPending, data: usuarios } = useFetch('https://flaskhalfwayhome.herokuapp.com/usuarios')
  
  return (

    <Container>

      <Login/>

      <Row className="justify-content-md-center">
        <Col md="auto"><h1>Lista de usuarios disponibles:</h1></Col>
      </Row>
      
      <Row>
        <Col>
          <a href="/crearUsuario" type="button" className="btn btn-success">
            Crear usuario
          </a>
        </Col>
      </Row>

      <br/>
      
      { error && <div>{ error }</div> }
      { isPending && <div>LOADING <Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /></div>  }
      { usuarios && <UsuarioList usuarios={usuarios} /> }

    </Container>
  );
}

export default UsuariosListar;