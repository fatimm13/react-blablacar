import { useState } from "react";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents  } from 'react-leaflet'
import L from 'leaflet';
import { useHistory } from "react-router-dom";
import {useGlobalState} from 'state-pool';

const MapInput = () => {
    const [origen, setOrigen] = useState(null);
    const [destino, setDestino] = useState(null);
    const [selOr, setSelOr] = useState(true);
    const [nombre, setNombre] = useState('');
    const [plazas, setPlazas] = useState(0);
    const [libres, setLibres] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [mensaje, setMensaje] = useState(null);
    const [usuario] = useGlobalState("user");
    const [token] = useGlobalState("token");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
      e.preventDefault();
      var msg = "";
      if(origen===null || destino ===null){
        msg +="Seleccione origen y/o destino. \n";
      }
      if(nombre===""){
        msg+="Introduzca un nombre de viaje. \n";
      }
      if(libres<=0 || libres>plazas){
        msg+="El número de plazas libres debe ser mayor que 0 y menor que el número de plazas totales. \n";
      }
      if(precio<=0 ){
        msg+="El precio no puede ser 0 o negativo. \n";
      }
      if(fecha==="" || hora===""){
        msg+="Inserte fecha y/o hora. ";
      }
      if(msg===""){
        var date = fecha+" "+hora
        
        const body = {"nombreConductor":usuario.nombre,"idConductor":usuario.id,nombre,"plazas":parseInt(plazas), "libres":parseInt(libres), "precio":parseFloat(precio), "latOrig":origen.lat,"latDest":destino.lat, "longOrig":origen.lng,"longDest":destino.lng, "hora":date };
        console.log(body);
        fetch('https://flaskhalfwayhome.herokuapp.com/viajes', {
          method: 'POST',
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(body)
        }).then(() => {
          // history.go(-1);
          history.push('/');
        })
      }else{
        setMensaje(msg)
      }
    }

    var greenIcon = new L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const handleClick = () => {
        setSelOr(!selOr)
    }

    function LocationMarker() {
        
        const map = useMapEvents({
          click(e) {
            if(selOr){
                setOrigen(e.latlng)
            }else{
                setDestino(e.latlng)
            }
            
          },
          locationfound(e) {
            map.flyTo(e.latlng, map.getZoom())
          },
        })
        map.locate()
        return(
            <div>
                { origen && <Marker id = "origen" position={origen} > <Popup>Origen</Popup> </Marker> }
                { destino && <Marker id = "destino" position={destino} icon={greenIcon}> <Popup>Destino</Popup> </Marker> }
            </div>
        );
      }
      
      return(
        <div className="createViaje">
          {mensaje && <Alert variant='warning'>{mensaje}</Alert>}
          <h1>Crear viaje</h1>
          <div className="form-container">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nombre del viaje</Form.Label>
                    <Form.Control type="text" placeholder="Introduzca el nombre de su viaje." value={nombre} onChange={(e)=>setNombre(e.target.value)} required/>
                </Form.Group>
              <Row className="mb-3">
                <Form.Group  as={Col} md="5" controlId="formPlazas">
                          <Form.Label>Plazas totales</Form.Label>
                          <Form.Control type="number" placeholder="Introduzca las plazas del vehiculo." value={plazas} onChange={(e)=>setPlazas(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} md={{ span: 5, offset: 2 }} controlId="formLibres">
                          <Form.Label>Plazas libres</Form.Label>
                          <Form.Control type="number" placeholder="Introduzca las plazas disponibles." value={libres} onChange={(e)=>setLibres(e.target.value)} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group  as={Col} md="5" controlId="formFecha">
                          <Form.Label>Fecha</Form.Label>
                          <Form.Control type="date" placeholder="Fecha de salida" value={fecha} onChange={(e)=>setFecha(e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} md={{ span: 5, offset: 2 }} controlId="formHora">
                          <Form.Label>Hora</Form.Label>
                          <Form.Control type="time" placeholder="Hora de salida" value={hora} onChange={(e)=>setHora(e.target.value)} />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="formPrecio">
                        <Form.Label>Precio por plaza</Form.Label>
                        <Form.Control type="number" placeholder="Introduzca el precio por plaza del vehiculo." value={precio} onChange={(e)=>setPrecio(e.target.value)} />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} >
                    <Button variant="primary" disabled={selOr} onClick={handleClick} >Origen</Button>{' '}
                    <Button variant="success" disabled={!selOr} onClick={handleClick}>Destino</Button>{' '}
                    <MapContainer center={{ lat: 40.4167, lng: -3.70325  }} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                    </MapContainer>
                </Form.Group>
              </Row>
              <br/>
              <Button variant="primary" type="submit"> Crear viaje </Button>
            </Form>
          </div>
            
        </div>
      );
  
}
 
export default MapInput;