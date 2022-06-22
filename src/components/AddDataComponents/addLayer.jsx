import React, { Component } from "react";
class AddLayer extends Component {
  state = {};
  handleChange = (e) => {
    //clone
    let state = { ...this.state };
    //edit
    state[e.currentTarget.name] = e.currentTarget.value;
    //setState
    this.setState(state);
  };
  render() {
    return (
      <React.Fragment>
        <div className="ol-attribution ol-control hidden" id="mydiv">
          <div id="mydivheader">Add Layer</div>

          <label htmlFor="fname">Layer name:</label>
          <input
            type="text"
            className="text-input m-2"
            id="lname"
            name="lname"
          />
          <div className="containerTable">
            <div className="row">
              <div className="col m-2">
                <label htmlFor="Feilds">Feilds</label>
              </div>
              <div className="col m-2">
              <button id="addField">Add</button>

              </div>
            </div>
            <div>
              <input type="text" onChange={this.handleChange} className="text-input m-2" value="ID" />
              <select id="feildId" name="feild1">
                <option value="int">int</option>
                <option value="string">string</option>
                <option value="double">double</option>
              </select>
            </div>
          </div>

          <br />
          <button className="button-form">Save</button>
          <button className="button-form" id="cancel">
            Cancel
          </button>
        </div>
      </React.Fragment>
    );
  }
}
export default AddLayer;
