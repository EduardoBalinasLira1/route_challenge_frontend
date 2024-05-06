export interface ITable {
    datos?: IVehicle[] | IOperator[] | IRoute[] | any
    handleDelete?: any
    handleEdit?: any
}

interface columns {
    header: string
}

export interface IVehicle {
    _id?: string
    placa: string;
    numero_economico: string;
    vim: string;
    asientos: number;
    seguro: string;
    segure_number: string;
    BRAND: string;
    MODEL: string;
    YEAR: number;
    COLOR: string;
}

export interface IOperator {
    _id?: string
    name: string;
    lastName: string;
    telephone: string;
    email: string;
}

export interface IRoute {
    _id?: string
    name: string;
    coordinates: Array<{ latitud: number; longitud: number }>;
}