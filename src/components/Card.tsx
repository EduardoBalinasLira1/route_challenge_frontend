import React from "react";
import GeoCoding from "./GeoCoding";

const Card: React.FC<any> = ({
     onClick,
    trip
}) => {
  
  return (
    <div className="card mt-3" style={{width: "18rem"}} onClick={() => onClick(trip.route.coordinates, trip)}>
      <div className="card-header d-flex justify-content-between">
        <span>{trip.route.name}</span>
        <span className="badge rounded-pill bg-primary">{trip.status}</span>
      </div>
      <div className="card-body">
        <h5 className="card-title text-center">{trip.operator.name} {trip.operator.lastName}</h5>
        <p className="card-text text-center lead">
          {trip.vehicle.BRAND}-{trip.vehicle.placa}
        </p>
        <hr />
        {trip.route.coordinates !== undefined ? <GeoCoding lat={trip.route.coordinates[0].latitud} lng={trip.route.coordinates[0].longitud} info="Origen: " /> : null}
        {trip.route.coordinates !== undefined ? <GeoCoding lat={trip.route.coordinates[trip.route.coordinates.length -1].latitud} lng={trip.route.coordinates[trip.route.coordinates.length -1].longitud} info="Destino: " /> : null}
      </div>
    </div>
  );
};

export default Card;
