import UsuarioList from './UsuarioList'
import { Container, Col, Row, Spinner } from 'react-bootstrap';
import useFetch from './useFetch';

const Mensajeria = (datos) =>  {

    const{url} = datos
    const { error, isPending, data: usuarios } = useFetch(url)
    
    return (

        <Container>
            
            { error && <div>{ error }</div> }
            { isPending && <div>LOADING <Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /></div>  }
            { usuarios &&
                
                <Row> 
                    <h3>Resultados de búsqueda:</h3>
                    <br/>
                    <br/>
                    {usuarios.length === 0 && <Col>No se han encontrado usuarios con ese nombre exacto. Compruebe las mayúsculas y que lo ha escrito correctamente.</Col>}
                    <UsuarioList usuarios={usuarios} /> 
                </Row>
            }

        </Container>
    );
}

export default Mensajeria;