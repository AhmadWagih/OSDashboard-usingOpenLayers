
import { Link } from "react-router-dom";

const Intro = () => {
  return ( <>
    <h2>select how do you want to load your data</h2>
    <div className="flexContainer m-2">
      <Link className="nav-link" to={"/mainpage/draw"}>
        <div className="mainPage">Draw your data</div>
      </Link>
      <Link className="nav-link" to={"/mainpage/json"}>
        <div className="mainPage">Json File</div>
      </Link>
      </div>
      <div className="flexContainer m-2">
      <Link className="nav-link" to={"/mainpage/csv"}>
        <div className="mainPage">CSV File</div>
      </Link>
      <Link className="nav-link" to={"/mainpage/geoserver"}>
        <div className="mainPage">Geoserver</div>
      </Link>
    </div>
  </> );
}
 
export default Intro;