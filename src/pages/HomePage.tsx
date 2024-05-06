import { Fragment } from "react/jsx-runtime";
import Card from "../components/Card";
import { useEffect, useRef, useState } from "react";
import Map from "../components/Map";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { IOperator, IRoute, IVehicle } from "../interfaces/TableInterface";
import Input from "../components/Input";
import InformationTrip from "../components/InformationTrip";

const HomePage = () => {
  const [trips, setTrips] = useState<any[]>();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<any>();
  const [routes, setRoutes] = useState<IRoute[]>([]);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [operators, setOperators] = useState<IOperator[]>([]);
  const [trip, setTrip] = useState()
  const vehiclesRef = useRef<any>();
  const operatorRef = useRef<any>();
  const routeRef = useRef<any>();
  const [reload, setReload] = useState(false);

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const loadOperator = async () => {
      const response = await fetch("https://route-challenge-backend.onrender.com/api/operators");
      const { data } = await response.json();
      setOperators(data.data);
    };
    loadOperator();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("https://route-challenge-backend.onrender.com/api/routes");
      const { data } = await response.json();
      console.log(data);

      setRoutes(data.data);
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadVehicles = async () => {
      const response = await fetch("https://route-challenge-backend.onrender.com/api/vehicles");
      const { data } = await response.json();
      setVehicles(data.data);
      console.log(data);
    };
    loadVehicles();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("https://route-challenge-backend.onrender.com/api/trips");
      const { data } = await response.json();
      console.log(data);

      setTrips(data);
    };
    loadData();
  }, [reload]);

  const handleClick = (coordinates: any, trip: any) => {
    setCoordinates(coordinates)
    setTrip(trip)
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const vehicle = vehicles.find((v) => v._id === vehiclesRef.current.value);
    const operator = operators.find((o) => o._id === operatorRef.current.value);
    const route = routes.find((r) => r._id === routeRef.current.value);

    const tripObject = {
      status: "OnRoute",
      startDate: formData.startDate,
      endDate: formData.endDate,
      vehicle: vehicle,
      operator: operator,
      route: route,
    };

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripObject),
    };

    const response = await fetch("https://route-challenge-backend.onrender.com/api/trips", payload);

    if (!response.ok) {
      console.log("falle");
    }

    const data = await response.json();
    setIsShowModal(false);
    setReload(true);
  };
  return (
    <Fragment>
      <div className="container-fluit row overflow-hidden">
        <div className="col-2">
          <Button
            type="button"
            className="btn btn-primary mt-3"
            text="Crear viaje"
            onClick={() => setIsShowModal(!isShowModal)}
          />
          {isShowModal ? (
            <Modal
              nameModal={"Crear viaje"}
              setShowModal={setIsShowModal}
              showModal={isShowModal}
            >
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="">Fecha Inicial</label>
                  <Input
                    type="datetime-local"
                    className="form-control"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    placeholder="Fecha Inicial"
                  />
                </div>
                <div>
                  <label htmlFor="">Fecha Final</label>
                  <Input
                    type="datetime-local"
                    className="form-control"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    placeholder="Fecha Final"
                  />
                </div>
                <select
                  name=""
                  id=""
                  ref={vehiclesRef}
                  className="form-control"
                  required
                >
                  <option value="">Selecciona un vehiculo</option>
                  {vehicles?.map((vehicle) => {
                    return (
                      <option value={vehicle._id}>
                        {vehicle.BRAND} {vehicle.placa}
                      </option>
                    );
                  })}
                </select>
                <select
                  name=""
                  id=""
                  className="form-control mt-3"
                  ref={operatorRef}
                  required
                >
                  <option value="">Selecciona un operador</option>
                  {operators?.map((operator) => {
                    return (
                      <option value={operator._id}>
                        {operator.name} {operator.lastName}
                      </option>
                    );
                  })}
                </select>
                <select
                  name=""
                  id=""
                  className="form-control mt-3"
                  ref={routeRef}
                  required
                >
                  <option value="">Selecciona una ruta</option>
                  {routes?.map((route) => {
                    return <option value={route._id}>{route.name}</option>;
                  })}
                </select>
                <Button
                  type="submit"
                  className="btn btn-success mt-3"
                  text="Guardar"
                />
              </form>
            </Modal>
          ) : null}
          {trips && trips.length > 0
            ? trips.map((trip) => (
                <Card
                  onClick={handleClick}
                  trip={trip}
                />
              ))
            : null}
          
        </div>
        <div className="col-10" style={{ position: "relative", left: "2%" }}>
          <Map coordinates={coordinates} />
          <div
            style={{
              position: "absolute",
              top: "-1%",
              left: "72%",
              zIndex: 1000,
            }}
          >
            <InformationTrip trip={trip} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
