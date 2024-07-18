import { IControlData, IRecordData, IRecordsDataRequest, IRecordsDataResponse, IRecordSourceParams } from "./types/Interfaces";
import { IRecord } from "./types/Record";

export class OpportunityData {
    constructor() {}

    async getRecordsData(context: IControlData<IRecordSourceParams>, request: IRecordsDataRequest): IRecordsDataResponse {
        var data = await this.getData();

        return{
            requestId: request.requestId,
            records: data.map((record) => { return {
                data: JSON.stringify(record),
                id: record.name,
                sortDateValue: new Date().toISOString()
            } as IRecordData; })
        }
    }

    async getData(): Promise<IRecord[]> {
        return [];
    }
}