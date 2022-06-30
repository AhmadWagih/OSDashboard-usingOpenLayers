import React, { useContext,useState,useCallback } from "react";
import { AddDataContext } from './../../contexts/addData';

const GeoServer = (props) => {
  const [wfsurl,setWfsurl]=useState({wfsurl:""});

  const {wfsGeoserver,save}= useContext(AddDataContext)

  const handleChange =useCallback( (e) => {
    const {value,name} = e.target;
    setWfsurl((u) => ({ ...u, [name]: value }))
  },[])

  return ( 
    <>
        <div>
          <label class="label-dark" htmlFor="jsonUrl">input URL</label>
          <input
            onChange={handleChange}
            type="url"
            className="text-input"
            name="wfsurl"
            id="url"
            size="60"
            value={wfsurl.wfsurl}
          />
        </div>
        <button
          onClick={() => wfsGeoserver(wfsurl.wfsurl)}
          className="button-form"
        >
          View
        </button>
      </>
   );
}
 
export default GeoServer;
