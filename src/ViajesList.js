import { Link } from 'react-router-dom';

const ViajesList = ({ viajes }) => {
  return (
    <div className="blog-list">
      {viajes.map(viaje => (
        <div className="blog-preview" key={viaje.id} >
          <Link to={`/viajes/${viaje.id}`}>
            <h2>{ viaje.nombre }</h2>
            <p>Viaje de { viaje.nombreConductor }</p>
            <p>Origen { viaje.origen }</p>
            <p>Destino { viaje.destino }</p>
            <p>Libres: {viaje.libres} </p>
            <p>Precio: {viaje.precio}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
 
export default ViajesList;