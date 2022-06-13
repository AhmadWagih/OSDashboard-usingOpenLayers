import React, { useState,useCallback } from "react";

const GeoServer = (props) => {
  const [wfsurl,setWfsurl]=useState({wfsurl:""});

  const handleChange =useCallback( (e) => {
    const {value,name} = e.target;
    setWfsurl((u) => ({ ...u, [name]: value }))
  },[])

  return ( 
    <>
        <div>
          <label htmlFor="jsonUrl">input URL</label>
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
          onClick={() => props.wfsGeoserver(wfsurl.wfsurl)}
          className="button-form"
        >
          View
        </button>
      </>
   );
}
 
export default GeoServer;
