import React from "react";
import { ITable } from "../interfaces/TableInterface";

const Table: React.FC<ITable> = ({ datos, handleDelete, handleEdit }) => {
  if (!datos || datos.length === 0) {
    return <p>No hay datos para mostrar.</p>;
  }

  const columnas = Object.keys(datos[0]).filter((columna) => columna !== "_id");
  console.log(columnas);

  return (
    <table className="table">
      <thead>
        <tr>
          {columnas.map((columna, index) => (
            <th key={index}>{columna === "coordinates" ? "" : columna}</th>
          ))}
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {datos.map(
          (
            objeto: {
              [x: string]:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            },
            index: React.Key | null | undefined
          ) => (
            <tr key={index}>
              {columnas.map((columna, columnIndex) => (
                <td key={columnIndex}>
                  {columna === "coordinates" ? null : objeto[columna]}
                </td>
              ))}
              <td>
              <button
                className="btn btn-primary"
                onClick={() => handleEdit(objeto)}
              >
                Edit
              </button>
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(objeto)}
              >
                Delete
              </button>
            </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default Table;
