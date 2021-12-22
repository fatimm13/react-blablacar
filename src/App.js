import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './Home';
import ViajesDetails from './ViajesDetails';
import NotFound from './NotFound';
import MiNavbar from './MiNavbar';
import Footer from './Footer';
import MapInput from './MapInput';
import CreateUsuario from './CreateUsuario';
import ViajesListar from './ViajesListar';
import MapRoute from './MapRoute';

import {useGlobalState} from 'state-pool';
import Perfil from './Perfil';
import EditarPerfil from './EditarPerfil';
import { Button } from 'react-bootstrap';



function App() {

  useGlobalState("user",{default: null, persist: true});

  return (
    <Router>
      <div className="App">
          <MiNavbar/>
          <br/>
          <br/>
          <div className="content">
            <Switch>
              {/** Se le pone exact en este caso porque sino para cualquier ruta se entraria a / ya que
               * react busca la primera coincidencia y todas las rutas empiezan con /
               * Tenedlo en cuenta por si os pasa con otras rutas
               */}
              <Route exact path="/">
                <Home/>
              </Route>

              <Route path="/viajes/:id">
                <ViajesDetails/>
              </Route>

              <Route path="/crearViaje">
                <MapInput/>
              </Route>

              <Route path="/crearUsuario">
                <CreateUsuario/>
              </Route>

              <Route path="/listarViajes">
                <ViajesListar/>
              </Route>
              
              <Route path="/perfil">
                <Perfil/>
              </Route>

              <Route path="/editPerfil">
                <EditarPerfil/>
              </Route>
              {/** Con esto deberia pillar todas las rutas no definidas e ir al componente NotFound */}
              <Route path="*">
                  {/*<MapRoute origen={{ lat: 36.4167, lng: -3.70325  }} destino={{ lat: 36.4167, lng: -4.70325  }}/>*/}
                  <NotFound/>

              </Route>
              

            </Switch>
          </div>
          <Footer/>
      </div>  
      
    </Router>
  );
}

export default App;
