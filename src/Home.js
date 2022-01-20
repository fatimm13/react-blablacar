import UsuarioList from './UsuarioList'
import { Col, Row, Container, Image } from 'react-bootstrap';
import useFetch from './useFetch';
import Login from './Login';

function UsuariosListar(usuario) {
 
  const { error, isPending, data: usuarios } = useFetch('https://flaskhalfwayhome.herokuapp.com/usuarios')
  
  return (

    <Container>

      <Row>
        <Col></Col>
        <Col md="auto"><h1>Bienvenido a tu página de confianza</h1></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col md="auto"><Image src="http://res.cloudinary.com/dugtth6er/image/upload/v1642642927/gdplkq2g7vy3rkbnh1ot.png" width="350" /></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col md="auto"><h5>Mantente actualizado de los viajes que disponemos siguiendo nuestra cuenta oficial de Twitter: </h5></Col>
        <Col></Col>
      </Row>
      <br/>
      <br/>
      <Row>
        <Col></Col>
        <Col md="auto"><a href="https://twitter.com/HalfwayhomeBot" aria-label="Tweet Us">
                    <svg version="1.1" id="Layer_1" width="50" height="50" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.588 511.588">
                        <path fill="#50ABF1" d="M508.508,93.804c-2.794-2.708-6.795-3.601-10.44-2.334l-17.252,5.953c10.162-12.297,17.66-25.14,21.608-37.315
                                c1.146-3.549,0.104-7.48-2.647-10.006c-2.768-2.543-6.786-3.263-10.275-1.805c-24.194,10.145-45.603,18.979-62.629,24.264
                                c-0.633,0.2-1.284,0.113-1.935-0.252c-13.572-7.602-47.547-25.062-71.68-24.784c-61.032,1.119-110.696,53.274-110.696,116.267
                                v3.445c-89.869-17.399-139.533-43.251-193.31-99.666l-8.4-8.817l-5.589,10.821C6.071,126.043,26.768,176.653,60.881,210.74
                                c-15.117-2.317-26.095-7.185-35.337-15.247c-3.549-3.072-8.583-3.454-12.54-0.937c-3.896,2.482-5.675,7.125-4.417,11.55
                                c11.481,40.622,42.227,73.98,74.683,93.913c-15.681-0.017-28.585-1.762-41.559-10.101c-3.775-2.43-8.687-2.178-12.21,0.607
                                c-3.497,2.777-4.842,7.463-3.35,11.672c15.82,44.431,45.403,67.801,94.425,73.624c-25.201,14.735-57.899,26.381-108.952,27.448
                                c-4.981,0.104-9.39,3.341-10.986,8.044C-0.958,416,0.5,421.033,4.344,424.122c31.024,25.01,100.612,39.945,186.151,39.945
                                c153.123,0,277.695-136.253,277.695-303.729v-2.942c19.812-9.468,34.929-28.151,42.921-53.274
                                C512.274,100.46,511.276,96.503,508.508,93.804z"/>
                        </svg>
                    </a></Col>
        <Col></Col>
      </Row>

      <br/>
      <br/>

      <Row>
        <Col></Col>
        <Col md="auto">Recuerde iniciar sesión para comenzar a disfrutar de la experiencia de nuestra página y comenzar a compartir y buscar viajes</Col>
        <Col></Col>
      </Row>
      
      

    </Container>
  );
}

export default UsuariosListar;