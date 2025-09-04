import { IControlData, IRecordData, IRecordsDataRequest, IRecordsDataResponse, IRecordSourceParams } from "./types/Interfaces";
import { IOrder } from "./types/Record";

export class OrderData {
    private context: IControlData<IRecordSourceParams>;

    constructor(context: IControlData<IRecordSourceParams>) {
        this.context = context;
    }

    async getRecordsData(request: IRecordsDataRequest): Promise<IRecordData[]> {
        let data = await this.getData();

        return data.map(this.mapRecord);
    }

    private async getData(): Promise<IOrder[]> {
        let accountId = this.context.page.entityId;
        let filter = `$filter=_accountid_value eq ${accountId}`
        let select = `$select=salesorderid,name,modifiedon,description,ordernumber,statuscode`;
        let orders = await this.context.webAPI.retrieveMultipleRecords("salesorder", `?${filter}&${select}`);
        return orders.entities.map(this.mapOrder);
    }

    private mapOrder(order: any): IOrder {
        let record = {
            id: order.salesorderid,
            name: order.name,
           description: order.description,
            date: order.modifiedon,
            statuscode: order.statuscode,
            ordernumber: order.ordernumber,
        };

        return record;
    }

    private mapRecord(record: IOrder): IRecordData {
        let recordData = {
            data: JSON.stringify(record),
            id: record.id,
            sortDateValue: record.date
        };

        return recordData;
    }
}