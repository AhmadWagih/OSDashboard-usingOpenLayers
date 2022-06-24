import DashBoardContextProvider from "../contexts/dashBoardContext";
import Dashboard from './dashboard';

const DashBoardModule = () => {
    return ( 
        <DashBoardContextProvider>
            <Dashboard/>
        </DashBoardContextProvider>
     );
}
 
export default DashBoardModule;