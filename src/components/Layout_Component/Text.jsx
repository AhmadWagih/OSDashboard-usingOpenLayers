import React, { Component } from 'react';

class Text extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div className="list-group-item">
              <h4>Text<i className="fa-solid fa-rectangle-xmark close" onClick={()=>{document.getElementsByClassName("column-4")[0].style.display="none";}}></i></h4>
            </div>
            <div className="component-div">
              <label htmlFor="componentName" className="label-dark">
                Component Name :
              </label>
              <input
                onChange={this.props.handleChange}
                className="text-input-dark d-block"
                placeholder="Enter Comp. name"
                id="component-name"
              />
            </div>
            <div className="component-div">
              <label htmlFor="text-size" className="label-dark w-75">
                Text size :
              </label>
              <input
              onChange={this.props.handleChange}
                type="number"
                className="text-input-dark w-20"
                id="text-size"
              />
            </div>
            <div className="component-div">
              <label htmlFor="color" className="label-dark w-75">
                Text Color
              </label>
              <input type="color" id="color" value={"#ff0000"} onChange={this.props.handleChange}/>
            </div>
            <div className="component-div">
              <label htmlFor="background-color" className="label-dark w-75">
                Background Color
              </label>
              <input type="color" id="background-color" value={"#ffffff"} onChange={this.props.handleChange}/>
            </div>
            <div className="component-div">
              <label htmlFor="componentName" className="label-dark w-75">
                Inner Text
              </label>
              <textarea
              onChange={this.props.handleChange}
                name=""
                id="innerText"
                cols="23"
                rows="4"
                className="text-input-dark d-block"
              ></textarea>
            </div>
            </React.Fragment>
        );
    }
}
 
export default Text;