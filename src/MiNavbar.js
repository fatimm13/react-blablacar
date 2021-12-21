import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import {useGlobalState} from 'state-pool';
import { useHistory } from "react-router-dom";
const MiNavbar = () => {
    const [user,setUser] = useGlobalState("user");
    const history = useHistory();
    const goTo = (url)=>{
        history.push(url)
    }
    const cerrarSesion = ()=>{
        setUser(null)
        history.push("/")
    }
    return ( 
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img alt="" src="https://res.cloudinary.com/dugtth6er/image/upload/v1639832622/HHLogo_g7fywq.png" id="logo" width="30" height="30" className="d-inline-block align-top" /> {' '}
                    Halfway Home
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <Nav.Link onClick={()=>goTo("/buscarViajes")}>Buscar Viajes</Nav.Link>
                        <Nav.Link onClick={()=>goTo("/crearViaje")}>Crear Viaje </Nav.Link>
                    </Nav>
                    {user &&
                    <Nav>
                        <img src={user.imagen} width="35" height="35" className="d-inline-block align-top" alt="Foto de perfil del usuario" />
                        
                        <NavDropdown title="Perfil del usuario" id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={()=>goTo("/perfil")}>Ver perfil</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Editar perfil</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={cerrarSesion}> Cerrar sesi&oacute;n </NavDropdown.Item>
                        </NavDropdown>
                        
                    </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default MiNavbar;