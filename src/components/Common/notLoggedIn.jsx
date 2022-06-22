import React from "react";

const NotLoggedIn = (props) => {
  
  return ( <>
    <h2>Geo-Spatial Dashboards</h2>
    <p>
      It's a type of dashboard which has a Place and Time component to
      convey information. Think about it from a delivery comapny's
      perspective, they use these dashboards to see where their delivery
      partners and how well they are performing. Or, GeoSpatial dashboards
      which helps in displaying the weather and natural disaster areas over
      time. These aren't mainstream dashboards, becasue these dashboards
      require large amount of data to be displayed in the Map or a timeline,
      they become bulky and heavy. The main focus on these type of
      dashboards are on the <strong>Location component (Maps)</strong> and{" "}
      <strong>Time component (Timeline)</strong>. These two components are
      interconnected to give the user a better idea about how geo properties
      change over time.
    </p>
    <img
      src={require("../../imgs/kepler-gl.png")} style={{height:"500px",width:"800px"}}
    />
  </> );
}
 
export default NotLoggedIn;