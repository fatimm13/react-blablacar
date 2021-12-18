import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Spinner } from "react-bootstrap";
const ViajesDetails = () => {
  const { id } = useParams();
  const { data: viaje, error, isPending } = useFetch('http://localhost:5000/viajes/' + id);
  const history = useHistory();

  const handleClick = () => {
    fetch('http://localhost:5000/viajes/' + viaje.id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    }) 
  }

  return (
    <div className="blog-details">
      { isPending && <Spinner animation="border" variant="dark" /> }
      { error && <div>{ error }</div> }
      { viaje && (
        <article>
          <h2>{ viaje.nombre }</h2>
            <p>Viaje de { viaje.nombreConductor }</p>
            <p>Origen { viaje.origen }</p>
            <p>Destino { viaje.destino }</p>
            <p>Libres: {viaje.libres} </p>
            <p>Precio: {viaje.precio}</p>
        </article>
        
      )}
    </div>
  );
}
 
export default ViajesDetails;