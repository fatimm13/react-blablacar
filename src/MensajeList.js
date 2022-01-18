import { Row, Col, Container } from "react-bootstrap";
//import { Card, Col, Button, ListGroup, ListGroupItem, Row, Image, Modal, Form, Container } from 'react-bootstrap';
import { useGlobalState} from 'state-pool';
import MensajeCreate from "./MensajeCreate";

const MensajeList = ({ mensajes }) => {
    const [user, setUser] = useGlobalState("user");
    

    return ( 
        <div>
            <Row className="scrollable">
                    {mensajes.map(mensaje=>{
                        
                        return(
                            <div>
                                { user.id===mensaje.creador && 
                                    <Row >
                                        <Col></Col> 
                                        <Col className="derecha">
                                            <p>{ mensaje.contenido } </p> 
                                            <p className="text_der"> ({new Date(mensaje.fecha).toLocaleTimeString("es-ES")}) {new Date(mensaje.fecha).toLocaleDateString("es-ES")}</p>
                                            </Col> 
                                    </Row>
                                } 
                                
                                { user.id!==mensaje.creador && 
                                    <Row >
                                        
                                        <Col className="izquierda">
                                            <p>{ mensaje.contenido }</p>
                                            <p className="text_der"> ({new Date(mensaje.fecha).toLocaleTimeString("es-ES")}) {new Date(mensaje.fecha).toLocaleDateString("es-ES")}</p>
                                        </Col> 
                                        <Col></Col> 
                                    </Row>
                                } 
                                    
                                <br/>
                            </div>
                        )
                    })}
            </Row>
            <MensajeCreate/>
        </div>
    );
}
 
export default MensajeList;