import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

const MiNavbar = () => {
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
                        <Nav.Link href="#action1">Buscar Viaje</Nav.Link>
                        <Nav.Link href="/crearViaje">Crear Viaje</Nav.Link>
                    </Nav>
                    <Nav>
                        <img src="https://res.cloudinary.com/dugtth6er/image/upload/v1639832477/perfil_hont25.png" width="35" height="35" className="d-inline-block align-top" alt="Foto de perfil del usuario" />
                        <NavDropdown title="Perfil del usuario" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action3">Ver perfil</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Editar perfil</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5"> Cerrar sesi&oacute;n </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default MiNavbar;