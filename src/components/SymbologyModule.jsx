

import SymbologyContextProvider from '../contexts/symbologyContext';
import Symbology from './symbology';

const SymbologyModule = () => {
    return ( 
        <SymbologyContextProvider>
            <Symbology/>
        </SymbologyContextProvider>
     );
}
 
export default SymbologyModule;