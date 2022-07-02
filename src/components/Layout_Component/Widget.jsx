import React from "react";

const Widget = ({ renderRightPanel }) => {
  return (
    <>
      <div>
        <h4 className="list-group-item">Widgets</h4>
      </div>
      <div className="list-elements" onClick={renderRightPanel}>
        <div className="d-inline m-2">
          <i className="fa-solid fa-map-location"></i>
        </div>
        Map
      </div>
      <div className="list-elements" onClick={renderRightPanel}>
        <div className="d-inline m-2">
          <i className="fa-solid fa-6"></i>
          <i className="fa-solid fa-7"></i>
        </div>
        Indicator
      </div>
      <div className="list-elements" onClick={renderRightPanel}>
        <i className="fa-solid fa-chart-pie m-2"></i>
        Pie Chart
      </div>
      <div className="list-elements" onClick={renderRightPanel}>
        <i className="fa-solid fa-chart-column m-2"></i>
        Bar Chart
      </div>
      <div className="list-elements" onClick={renderRightPanel}>
        <i className="fa-solid fa-table-cells m-2"></i>
        Table
      </div>
      <div className="list-elements" onClick={renderRightPanel}>
        <i className="fa-solid fa-spell-check m-2"></i>
        Text
      </div>
      {/* <div className="list-elements" onClick={renderRightPanel}>
        <i className="fa-solid fa-list m-2"></i>
        List
      </div> */}
    </>
  );
};

export default Widget;
