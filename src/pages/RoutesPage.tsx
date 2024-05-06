import React, { Fragment, useEffect, useState } from "react";
import Modal from "../components/Modal";
import Title from "../components/Title";
import Button from "../components/Button";
import Input from "../components/Input";
import Alert from "../components/Alert";
import { IRoute } from "../interfaces/TableInterface";
import Table from "../components/Table";
import Pagination from "../components/Pagination";

const MyComponent = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false)
  const [alertComponent, setAlertComponent] = useState<any>()
  const [allRoutes, setAllRoutes] = useState<IRoute[]>()
  const [reload, setReload] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [routes, setRoutes] = useState({
    _id: "",
    name: "",
    coordinates: [{ latitud: "", longitud: "" }],
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const paginationInfo = {
    page: currentPage,
  };

  useEffect(() => {
    const loadData = async () => {
      if(currentPage <1) {
        setCurrentPage(1)
      }
      const response = await fetch(`https://route-challenge-backend.onrender.com/api/routes?page=${currentPage}&pageSize=${10}`)
      const { data } = await response.json()
      
      setAllRoutes(data.data)
    }
    loadData()
  },[reload, currentPage])

  const handleRouteChange = (event: any) => {
    const { name, value } = event.target;
    setRoutes((prevRoutes) => ({
      ...prevRoutes,
      [name]: value,
    }));
  };

  const handleStopChange = (index: any, coord: any, value: any) => {
    const newcoordinates = routes.coordinates.map((stop, i) => {
      if (index === i) {
        return { ...stop, [coord]: value };
      }
      return stop;
    });
    setRoutes({ ...routes, coordinates: newcoordinates });
  };

  const addStop = () => {
    setRoutes({
      ...routes,
      coordinates: [...routes.coordinates, { latitud: "", longitud: "" }],
    });
  };

  const removeLastStop = () => {
    if (routes.coordinates.length > 1) {
      setRoutes({
        ...routes,
        coordinates: routes.coordinates.slice(0, -1),
      });
    } else {
      alert("Debe haber al menos una parada.");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (routes.coordinates.length <= 1) {
      alert("Necesitas al menos 2 paradas");
      return;
    }

    let payload
    let url
    if(isUpdate) {
payload = {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(routes),
}
url = "https://route-challenge-backend.onrender.com/api/routes/" + routes._id

    }else {
      payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routes),
      }
      url = "https://route-challenge-backend.onrender.com/api/routes"
    }

    const response = await fetch(url, payload);

    if (!response.ok) {
      setIsShowModal(false)
      setIsShowAlert(true)
      setAlertComponent(<Alert className="alert alert-danger mt-3" text="Informacion duplicado" />)
      setTimeout(() => {
        setIsShowAlert(false)
      },3000)
      return;
    }

    const data = await response.json();

    setReload(!reload);
    setIsShowModal(false);
    setIsShowAlert(true)
    setAlertComponent(<Alert className="alert alert-success mt-3" text="Vehiculo creado correctamente" />)

    setTimeout(() => {
        setIsShowAlert(false)
    },3000)
  };

  const handleDelete = async (data:any) => {
    const payload = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
          },
    }
    const response = await fetch("https://route-challenge-backend.onrender.com/api/routes/" + data._id, payload)
    setReload(!reload)

    const dataResponse = await response.json()    
    
  }

  const handleEdit = (data:any) => {

    const updatedFormData: any = { ...routes };
  
    Object.keys(data).forEach((key) => {
      if (routes.hasOwnProperty(key)) {
        updatedFormData[key] = data[key];
      }
    });
  
    setRoutes(updatedFormData);
    setIsUpdate(true)
    setIsShowModal(true);
  }

  const handleAdd = () => {
    setRoutes({
        _id: "",
        name: "",
        coordinates: [{ latitud: "", longitud: "" }],
      });
      setIsShowModal(true)
      setIsUpdate(false)
  }


  return (
    <Fragment>
      <Title text="Rutas" />
      <Button
        type="button"
        className="btn btn-primary"
        text="Agregar ruta"
        onClick={() => handleAdd()}
      />
       {isShowAlert && alertComponent}      
      {isShowModal ? (
        <Modal
          nameModal="Agregar ruta"
          setShowModal={setIsShowModal}
          showModal={isShowModal}
        >
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={routes.name}
              onChange={handleRouteChange}
              placeholder="Nombre de la ruta"
            />

            {routes.coordinates.map((stop, index) => (
              <div key={index} className="row">
                <div className="col-6">
                  <Input
                    type="text"
                    className="form-control"
                    id="latitud"
                    name="latitud"
                    value={stop.latitud}
                    onChange={(e) =>
                      handleStopChange(index, "latitud", e.target.value)
                    }
                    placeholder="Latitud"
                  />
                </div>
                <div className="col-6">
                  <Input
                    type="text"
                    className="form-control"
                    id="longitud"
                    name="longitud"
                    value={stop.longitud}
                    onChange={(e) =>
                      handleStopChange(index, "longitud", e.target.value)
                    }
                    placeholder="Longitud"
                  />
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-between">
              <Button type="button" className="btn btn-primary" text="Agregar parada" onClick={addStop}/>
              <Button type="button" className="btn btn-danger" text="Borrar ultima parada" onClick={removeLastStop}/>
              <Button type="submit" className="btn btn-success" text="Guardar"/>
            </div>
          </form>
        </Modal>
      ) : null}
      <Table datos={allRoutes} handleDelete={handleDelete} handleEdit={handleEdit} />
      <div className="pagination justify-content-center">
        <Pagination pagination={paginationInfo} handlePageChange={handlePageChange} />
      </div>
    </Fragment>
  );
};

export default MyComponent;
