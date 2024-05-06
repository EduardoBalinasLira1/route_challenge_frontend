import { Key } from "react";
import GeoCoding from "./GeoCoding";
import { formatDate } from "../utils";

const InformationTrip: React.FC<any> = ({ trip }) => {

  if (trip === undefined) {
    return null;
  } else {
    return (
        <div className="card mt-3 shadow" style={{ backgroundColor: '#f8f9fa', borderRadius: '15px' , width: "22rem"}}>
      <div className="card-body">
        <h4 className="card-title text-primary mb-4">{trip.route.name}</h4>
        <div className="row mb-4">
          <div className="col-6">
            <p className="mb-0"><strong>Inicio:</strong> {formatDate(trip.startDate)}</p>
          </div>
          <div className="col-6">
            <p className="mb-0"><strong>Fin:</strong> {formatDate(trip.endDate)}</p>
          </div>
        </div>
        <h3 className="text-primary mb-3">Detalles del Operador</h3>
        <ul className="list-unstyled mb-4">
          <li>{trip.operator.name} {trip.operator.lastName}</li>
          <li>Email: {trip.operator.email}</li>
          <li>Teléfono: {trip.operator.telephone}</li>
        </ul>
        <h3 className="text-primary mb-3">Detalles del Vehículo</h3>
        <ul className="list-unstyled mb-4">
          <li>{trip.vehicle.BRAND} {trip.vehicle.MODEL} {trip.vehicle.YEAR}</li>
          <li>Placa: {trip.vehicle.placa}</li>
          <li>Número Económico: {trip.vehicle.numero_economico}</li>
          <li>Seguro: {trip.vehicle.seguro}</li>
          <li>Número de Seguro: {trip.vehicle.segure_number}</li>
        </ul>
        <h3 className="text-primary mb-3">Ruta</h3>
        <div className="row">
          {trip.route.coordinates.map((c: { latitud: any; longitud: any; }, index: Key | null | undefined) => (
            <div className="col-6 mb-3" key={index}>
              <GeoCoding lat={c.latitud} lng={c.longitud} />
            </div>
          ))}
        </div>
      </div>
    </div>
    );
  }
};

export default InformationTrip;
