import { IConfiguration } from "./types/Configuration";
import { IControlData, IRecordData, IRecordsDataRequest, IRecordsDataResponse, IRecordSourceParams } from "./types/Interfaces";

export class Data {
    private context: IControlData<IRecordSourceParams>;
    private config: IConfiguration;

    constructor(context: IControlData<IRecordSourceParams>, config: IConfiguration) {
        this.context = context;
        this.config = config;
    }

    async getRecordsData(request: IRecordsDataRequest): Promise<IRecordData[]> {
        let data = await this.getData();

        return data.map((record) => this.mapRecord(record));
    }

    private async getData(): Promise<any[]> {
        let id = this.context.page.entityId;
        let filter = `$filter=${this.config.filterField} eq ${id}`
        let select = `$select=${this.config.selectFields}`;
        let contacts = await this.context.webAPI.retrieveMultipleRecords(this.config.entityName, `?${filter}&${select}`);
        return contacts.entities;
    }

    private mapRecord(record: any): IRecordData {
        let recordData = {
            data: JSON.stringify(record),
            id: record[this.config.idField],
            sortDateValue: record[this.config.sortField]
        };

        return recordData;
    }
}