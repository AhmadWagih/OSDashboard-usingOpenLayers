
import { useState, useEffect } from "react";
import Card from "./card";
import { DeleteDashboard, getAllDashboards } from './../../APIs/dashboard';
 
 const MyDashboards = ()=>{

  const [dashboards, setDashboards] = useState(null);

  useEffect(() => {
      setTimeout(async() => {
        const dashboards = await getAllDashboards();
        setDashboards(dashboards);
      }, 1000);
  }, []);

  const deleteHandler = (id) => {
    const result = DeleteDashboard(id);
    if (result) {
      const newdashes = dashboards.filter((dashboard) => dashboard.id !== id);
      setDashboards(newdashes);
    }
  };

  return !dashboards ? (
    <div className="spinner-div">
    <div className="spinner-border text-light" role="status">
   <span className="visually-hidden">Loading...</span>
</div>
    </div>
  ) 
  :(dashboards.length===0)
  ?(
    <div className="myData-div">
      <h4 className="text-muted p-4">No Dashboards yet to Show...</h4>
    </div>
  )
  :(
    <>
      <div className="row">
        {dashboards.map(dashboard=><Card deleteHandler={deleteHandler} type={"dashboard"} key = {dashboard.id} image={require("../../imgs/dashboard.png")} layer={dashboard}/>)}
      </div>
    </>
  );
 };
 
 
 
 export default MyDashboards;