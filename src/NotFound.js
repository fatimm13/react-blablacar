import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <p>That page cannot be found</p>
      <p><Link to="/">Back to the homepage...</Link></p>
      <img src="https://res.cloudinary.com/dugtth6er/image/upload/v1639831776/Sad_pikocho_zqpoqk.png" alt="Sad pikocho."  />
      
    </div>
  );
}
 
export default NotFound;