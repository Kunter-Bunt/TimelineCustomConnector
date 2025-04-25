export interface IRecord {
    id: string;
    name: string;
    email: string;
    gender: number;
    date: string;
}

export interface IOrder {
    id: string;

    ordernumber: string;
    statuscode: number;
    name: string;
    description: string;
    date: string;
}