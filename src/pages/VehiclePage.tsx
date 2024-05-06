import { Fragment } from "react/jsx-runtime";
import Button from "../components/Button";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Table from "../components/Table";
import { IVehicle } from "../interfaces/TableInterface";
import Alert from "../components/Alert";
import Pagination from "../components/Pagination";

const VehiclePage = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false)
  const [alertComponent, setAlertComponent] = useState<any>()
  const [vehicles, setVehicles] = useState<IVehicle>();
  const [isUpdate, setIsUpdate] = useState(false)
  const [formData, setFormData] = useState({
    _id: "",
    placa: "",
    numero_economico: "",
    vim: "",
    asientos: "",
    seguro: "",
    segure_number: "",
    BRAND: "",
    MODEL: "",
    YEAR: "",
    COLOR: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const paginationInfo = {
    page: currentPage,
  };

  useEffect(() => {
    const loadVehicles = async () => {
      if(currentPage <1) {
        setCurrentPage(1)
      }
      const response = await fetch(
        `http://localhost:8080/api/vehicles?page=${currentPage}&pageSize=${10}`
      );
      const { data } = await response.json();
      
      setVehicles(data.data);
    };
    loadVehicles();
  }, [reload, currentPage]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let payload
    let url
    if(!isUpdate)  {
        payload = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          };
          url = "http://localhost:8080/api/vehicles"
    }else {
        payload = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          };
          url = "http://localhost:8080/api/vehicles/" + formData._id
    }
   

    const response = await fetch(url, payload);
    
    if (!response.ok) {
      setIsShowModal(false)
      setIsShowAlert(!reload)
      setAlertComponent(<Alert className="alert alert-danger mt-3" text="Informacion duplicado" />)
      setTimeout(() => {
        setIsShowAlert(false)
      },3000)
      return;
    }

    const data = await response.json();
    setReload(!reload);
    setIsShowModal(false);
    setFormData({
        _id: "",
      placa: "",
      numero_economico: "",
      vim: "",
      asientos: "",
      seguro: "",
      segure_number: "",
      BRAND: "",
      MODEL: "",
      YEAR: "",
      COLOR: "",
    });
    setIsShowAlert(true)
    setAlertComponent(<Alert className="alert alert-success mt-3" text="Vehiculo creado correctamente" />)

    setTimeout(() => {
        setIsShowAlert(false)
    },3000)

    setReload(!reload)
  };

  const handleDelete = async (data:any) => {
    console.log("Soy la placa: " + JSON.stringify(data));
    const payload = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
          },
    }
    const response = await fetch("http://localhost:8080/api/vehicles/" + data._id, payload)
    setReload(!reload)

    const dataResponse = await response.json()
    
    
  }

  const handleEdit = (data:any) => {

    const updatedFormData: any = { ...formData };
  
    Object.keys(data).forEach((key) => {
      if (formData.hasOwnProperty(key)) {
        updatedFormData[key] = data[key];
      }
    });
    setFormData(updatedFormData);
    setIsUpdate(true)
    setIsShowModal(true);
  }

  const handleAdd = () => {
    setFormData({
        _id: "",
        placa: "",
        numero_economico: "",
        vim: "",
        asientos: "",
        seguro: "",
        segure_number: "",
        BRAND: "",
        MODEL: "",
        YEAR: "",
        COLOR: "",
      });
      setIsShowModal(true)
      setIsUpdate(false)
  }


  return (
    <Fragment>
      <Title text="Vehiculos" />
      <Button
        type="button"
        className="btn btn-primary"
        text="Agregar vehiculo"
        onClick={() => handleAdd()}
      />
      
      {isShowAlert && alertComponent}      
      {isShowModal ? (
        <Modal
          nameModal={"Agregar vehiculo"}
          setShowModal={setIsShowModal}
          showModal={isShowModal}
        >
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              className="form-control"
              id="placa"
              name="placa"
              value={formData.placa}
              onChange={handleChange}
              placeholder="Placa"
            />
            <Input
              type="text"
              className="form-control"
              id="numero_economico"
              name="numero_economico"
              value={formData.numero_economico}
              onChange={handleChange}
              placeholder="Numero Economico"
            />
            <Input
              type="text"
              className="form-control"
              id="vim"
              name="vim"
              value={formData.vim}
              onChange={handleChange}
              placeholder="vim"
            />
            <Input
              type="text"
              className="form-control"
              id="asientos"
              name="asientos"
              value={formData.asientos}
              onChange={handleChange}
              placeholder="Asientos"
            />
            <Input
              type="text"
              className="form-control"
              id="seguro"
              name="seguro"
              value={formData.seguro}
              onChange={handleChange}
              placeholder="Seguro"
            />
            <Input
              type="text"
              className="form-control"
              id="segure_number"
              name="segure_number"
              value={formData.segure_number}
              onChange={handleChange}
              placeholder="Numero de seguro"
            />
            <Input
              type="text"
              className="form-control"
              id="BRAND"
              name="BRAND"
              value={formData.BRAND}
              onChange={handleChange}
              placeholder="Marca"
            />
            <Input
              type="text"
              className="form-control"
              id="MODEL"
              name="MODEL"
              value={formData.MODEL}
              onChange={handleChange}
              placeholder="Modelo"
            />
            <Input
              type="text"
              className="form-control"
              id="YEAR"
              name="YEAR"
              value={formData.YEAR}
              onChange={handleChange}
              placeholder="año"
            />
            <Input
              type="text"
              className="form-control"
              id="COLOR"
              name="COLOR"
              value={formData.COLOR}
              onChange={handleChange}
              placeholder="Color"
            />
            <Button type="submit" className="btn btn-success" text="Guardar" />
          </form>
        </Modal>
      ) : null}

      <Table datos={vehicles} handleDelete={handleDelete} handleEdit={handleEdit}/>
      <div className="pagination justify-content-center">
        <Pagination pagination={paginationInfo} handlePageChange={handlePageChange} />
      </div>
    </Fragment>
  );
};

export default VehiclePage;
