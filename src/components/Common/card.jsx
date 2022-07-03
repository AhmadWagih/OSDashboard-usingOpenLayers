import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Link } from "react-router-dom";

const Card = ({ type, layer, image, deleteHandler }) => {
  const handleDelete = () => {
    confirmAlert({
      title: `Delete ${type}`,
      message: `You are Deleting ${type} ${layer.name}`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteHandler(layer.id),
        },
        {
          label: "No",
        },
      ],
      overlayClassName: "overLay",
      buttonGroupClassName: "title-alert",
    });
  };
  return (
    <div className="card">
      <img src={image} className="iconCard" alt="View Data" />
      <div className="card-body p-2">
        <h5 className="card-title">{layer.name}</h5>

        <p className="card-text">
          <small className="text-muted">Created on {layer.createdOn}</small>
        </p>
        {type === "layer" ? (
          <>
            <Link
              to={`/Symbology/${layer.id}`}
              className="nav-link d-inline p-0 m-2"
            >
              <button className="btn btn-secondary m-0">Edit Symbology</button>
            </Link>

            <button
              className="btn1 btn btn-secondary m-0"
              onClick={handleDelete}
            >
              Delete Layer
            </button>
            <Link to={`/Dashboard/?layerId=${layer.id}`} className="nav-link p-0 m-2">
              <button className="button-form button-form-heighted d-block">Create Dashboard</button>
            </Link>
          </>
        ) : (
          <>
            <Link to={`/Dashboard/${layer.id}`} className="nav-link d-block">
              <button className="btn btn-secondary d-block w-100 m-0" >Edit Dashboard</button>
            </Link>
            <button className="btn btn-secondary d-block w-100 m-0" onClick={handleDelete}>
              Delete Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
