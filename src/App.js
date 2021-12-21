import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './Home';
import ViajesDetails from './ViajesDetails';
import NotFound from './NotFound';
import CreateViaje from './CreateViaje';
import MiNavbar from './MiNavbar';
import Footer from './Footer';
import MapInput from './MapInput';
import CreateUsuario from './CreateUsuario';
import ViajesListar from './ViajesListar';
import MapRoute from './MapRoute';

function App() {

  return (
    <Router>
      <div className="App">
          <MiNavbar/>
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
                <CreateViaje/>
              </Route>

              <Route path="/crearUsuario">
                <CreateUsuario/>
              </Route>

              <Route path="/listarViajes">
                <ViajesListar/>
              </Route>
              
              {/** Con esto deberia pillar todas las rutas no definidas e ir al componente NotFound */}
              <Route path="*">
                  <MapInput/>
                  {/*<MapRoute origen={{ lat: 36.4167, lng: -3.70325  }} destino={{ lat: 36.4167, lng: -4.70325  }}/>*/}
                  {/**<NotFound/>*/}
              </Route>
              

            </Switch>
          </div>
          <Footer/>
      </div>  
      
    </Router>
  );
}

export default App;
