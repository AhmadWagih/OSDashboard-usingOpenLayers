import { DeleteLayer, getAllLayers } from "./../../APIs/layer";
import { useState, useEffect } from "react";
import Card from "./card";

const MyData = () => {
  const [layers, setLayers] = useState(null);

  useEffect(() => {
    setTimeout(async () => {
      const layers = await getAllLayers();
      setLayers(layers);
    }, 1000);
  }, []);

  const deleteHandler = (id) => {
    const result = DeleteLayer(id);
    if (result) {
      const newLayers = layers.filter((layer) => layer.id !== id);
      setLayers(newLayers);
    }
  };

  return !layers ? (
    <div className="spinner-div">
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : layers.length === 0 ? (
    <div className="myData-div">
      <h4 className="text-muted p-4">no Layerss yet.</h4>
    </div>
  ) : (
    <>
      <div className="row">
        {layers.map((layer) => (
          <Card
            deleteHandler={deleteHandler}
            key={layer.id}
            type={"layer"}
            image={require("../../imgs/layer.jpg")}
            layer={layer}
          />
        ))}
      </div>
    </>
  );
};

export default MyData;
