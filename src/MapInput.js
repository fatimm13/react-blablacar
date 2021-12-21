import { useState } from "react";
import { Alert, Button, Form, Row, Col } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents  } from 'react-leaflet'
import L from 'leaflet';
import { useHistory } from "react-router-dom";

const MapInput = () => {
    const [origen, setOrigen] = useState(null);
    const [destino, setDestino] = useState(null);
    const [selOr, setSelOr] = useState(true);
    const [nombre, setNombre] = useState('');
    const [plazas, setPlazas] = useState(0);
    const [libres, setLibres] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [mensaje, setMensaje] = useState(null);
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
      if(msg===""){

        
        const body = {nombre, plazas, libres, precio, "latOrigen":origen.lat,"latDestino":destino.lat, "longOrigen":origen.lng,"longDestino":destino.lng };
        console.log(body);
        fetch('http://localhost:5000/usuarios', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
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
        <div>
          {mensaje && <Alert variant='warning'>{mensaje}</Alert>}
          <h1>Crear viaje</h1>
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
              <Form.Group as={Col} md={{ span: 5, offset: 2 }} controlId="formPlazas">
                        <Form.Label>Plazas libres</Form.Label>
                        <Form.Control type="number" placeholder="Introduzca las plazas disponibles." value={libres} onChange={(e)=>setLibres(e.target.value)} />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formPlazas">
                      <Form.Label>Precio por plaza</Form.Label>
                      <Form.Control type="number" placeholder="Introduzca el precio por plaza del vehiculo." value={precio} onChange={(e)=>setPrecio(e.target.value)} />
            </Form.Group>
            <Row className="mb-3">
              <Col></Col>
              <Form.Group  as={Col} >
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
              <Col></Col>
            </Row>
            <br/>
            <Button variant="primary" type="submit"> Crear viaje </Button>
          </Form>
            
        </div>
      );
  
}
 
export default MapInput;