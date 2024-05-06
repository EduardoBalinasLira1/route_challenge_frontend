import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Title from "../components/Title";
import Button from "../components/Button";
import { IOperator } from "../interfaces/TableInterface";
import Input from "../components/Input";
import Table from "../components/Table";
import Alert from "../components/Alert";
import Pagination from "../components/Pagination";

const OperatorPage = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [reload, setReload] = useState(false)
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false)
  const [alertComponent, setAlertComponent] = useState<any>()
  const [operators, setOperators] = useState<IOperator[]>()
  const [isUpdate, setIsUpdate] = useState(false)
  const [formData, setFormData] = useState<IOperator>({
    _id: "",
    name: "",
    lastName: "",
    telephone: "",
    email: ""
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const paginationInfo = {
    page: currentPage,
  };


  useEffect(() => {
    const loadOperator = async () => {
      if(currentPage <1) {
        setCurrentPage(1)
      }
        const response = await fetch(`http://localhost:8080/api/operators?page=${currentPage}&pageSize=${10}`)
        const {data} = await response.json()
        setOperators(data.data)
    }
    loadOperator()
    }, [reload, currentPage])


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
    if(isUpdate) {
      payload = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }
    url = "http://localhost:8080/api/operators/" + formData._id
    } else {
      payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }
    url = "http://localhost:8080/api/operators"
    }
    const response = await fetch(url, payload )

    if (!response.ok) {
      setIsShowModal(false)
      setIsShowAlert(true)
      setAlertComponent(<Alert className="alert alert-danger mt-3" text="Informacion duplicado" />)
      setTimeout(() => {
        setIsShowAlert(false)
      },3000)
      return;
    }
    const data = await response.json()

    setReload(!reload)

    setFormData({
      name: "",
      lastName: "",
      telephone: "",
      email: ""
    });
    setIsShowModal(false)
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
    const response = await fetch("http://localhost:8080/api/operators/" + data._id, payload)
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
        name: "",
        lastName: "",
        telephone: "",
        email: ""
      });
      setIsShowModal(true)
      setIsUpdate(false)
  }


  return (
    <Fragment>
      <Title text="Operadores" />
      <Button
        type="button"
        className="btn btn-primary"
        text="Agregar operador"
        onClick={() => handleAdd()}
      />
       {isShowAlert && alertComponent}      
      {isShowModal ? (
        <Modal
          nameModal="Agregar operador"
          setShowModal={setIsShowModal}
          showModal={isShowModal}
        >
          <form onSubmit={handleSubmit}>
          <Input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <Input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Apellido"
            />
            <Input
              type="text"
              className="form-control"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="Telefono"
            />
            <Input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo"
            />
            <Button type="submit" className="btn btn-success" text="Guardar" />
          </form>
        </Modal>
      ) : null}
      <Table datos={operators} handleDelete={handleDelete} handleEdit={handleEdit}/>
      <div className="pagination justify-content-center">
        <Pagination pagination={paginationInfo} handlePageChange={handlePageChange} />
      </div>
    </Fragment>
  );
};

export default OperatorPage;
