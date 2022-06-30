import NavBarMyData from "./navbarMyData";
import {Route,Routes} from "react-router-dom"
import MyData from './myData';
import MyDashboards from './myDashboards';

const Home = () => {
  return (
    <div className="p-3">
    <NavBarMyData/>
    <Routes>
      <Route exact path="/" element={<MyData />} />
      <Route path="/myDashboards" element={<MyDashboards />} />
    </Routes>
    </div>
  );
}
 
export default Home;

