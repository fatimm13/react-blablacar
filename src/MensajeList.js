import { Row, Col, Container } from "react-bootstrap";
import { useGlobalState} from 'state-pool';
import MensajeCreate from "./MensajeCreate";

const MensajeList = ({ mensajes }) => {
    const [user, setUser] = useGlobalState("user");
    

    return ( 
        <div>
            <Container className="scrollable">
                <br/>
                {mensajes.map(mensaje=>{
                    
                    return(
                        <div>
                            { user.id===mensaje.creador && 
                            <Container>
                                <Row>
                                    <Col></Col>
                                    <Col md="auto" className="derecha">{ mensaje.contenido } </Col>
                                </Row>
                                <Row>
                                    <Col className="text_der"> {new Date(mensaje.fecha).toLocaleTimeString("es-ES")} [{new Date(mensaje.fecha).toLocaleDateString("es-ES")}]</Col>
                                </Row>
                            </Container>
                            } 
                            
                            { user.id!==mensaje.creador && 
                            <Container>
                                <Row>
                                    <Col md="auto" className="izquierda">{ mensaje.contenido } </Col>
                                </Row>
                                <Row>
                                    <Col className="text_izq"> {new Date(mensaje.fecha).toLocaleTimeString("es-ES")} [{new Date(mensaje.fecha).toLocaleDateString("es-ES")}]</Col>
                                </Row>
                            </Container>
                            } 
                                
                            <br/>
                        </div>
                    )
                })}
            </Container>
            <MensajeCreate/>
        </div>
    );
}
 
export default MensajeList;