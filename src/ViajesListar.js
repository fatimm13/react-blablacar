import ViajesList from "./ViajesList";
import useFetch from "./useFetch";
import { Spinner } from "react-bootstrap";


const ViajesListar = () => {
  const { error, isPending, data: viajes } = useFetch('http://localhost:5000/viajes')

  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>LOADING <Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /><Spinner animation="grow" size="sm" /></div>  }
      { viajes && <ViajesList viajes={viajes} /> }
      
    </div>
  );
}
 
export default ViajesListar;