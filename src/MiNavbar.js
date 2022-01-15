import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import {useGlobalState} from 'state-pool';
import { useHistory } from "react-router-dom";
import {firebase} from './Firebase';
import { getAuth, signOut } from "firebase/auth";

const MiNavbar = () => {

    const [user,setUser] = useGlobalState("user");
    const history = useHistory();

    const goTo = (url)=>{
        history.push(url)
    }

    const cerrarSesion = ()=>{
        setUser(null)
        let auth = getAuth();
        if(auth.currentUser){
            signOut(auth).then(() => {
                // Sign-out successful.
              }).catch((error) => {
                // An error happened.
            });
        }
        history.push("/")
    }
    
    return ( 
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img alt="" src="https://res.cloudinary.com/dugtth6er/image/upload/v1639832622/HHLogo_g7fywq.png" id="logo" width="30" height="30" className="d-inline-block align-top" /> {' '}
                    Halfway Home
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />

                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        {user &&<Nav.Link onClick={()=>goTo("/listarViajes")}>Buscar Viajes</Nav.Link>}
                        {user &&<Nav.Link onClick={()=>goTo("/crearViaje")}>Crear Viaje </Nav.Link>}
                        <Nav.Link onClick={()=>goTo("/gasolineras")}> Gasolineras </Nav.Link>
                    </Nav>
                    
                {user &&
                    <Nav>
                        <img src={user.imagen} width="35" height="35" className="d-inline-block align-top" alt="Foto de perfil del usuario" />
                        
                        <NavDropdown title={"Perfil de "+user.nombre} id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={()=>goTo("/perfil")}>Ver perfil</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>goTo("/editPerfil")}>Editar perfil</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>goTo("/viajesCreados")}>Viajes creados</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>goTo("/reservas")}>Tus reservas</NavDropdown.Item>
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