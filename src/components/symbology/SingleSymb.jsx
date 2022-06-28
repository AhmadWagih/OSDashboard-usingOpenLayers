
const SingleSymb = () => {
    return ( 
        <>
 <div className="list-group-item">
        <h4>Single Symbology</h4>
      </div>
      <div className="component-div border-bot">
        <label htmlFor="layer-name" className="label-dark">
          Layer Name
        </label>
        <input
          // onChange={handleChange}
          // value={state.layerName}
          name="layerName"
          className="text-input-dark"
          placeholder="Layer1"
          id="layer-name"
        />
      </div>
      
        
        </>
     );
}
 
export default SingleSymb;