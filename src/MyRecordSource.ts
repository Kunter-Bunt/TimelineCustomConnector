import { IRecord } from "./types/Record";
import { IControlData, IFilterGroup, IFilterRequest, IRecordCreate, IRecordData, IRecordIconData, IRecordSource, IRecordSourceInfo, IRecordSourceParams, IRecordUX, IRecordUXRequest, IRecordsDataRequest, IRecordsDataResponse } from "./types/Interfaces";
import { IconOption } from "./types/Enums";


export class MyRecordSource implements IRecordSource {
    private context: any;
    private config: JSON | undefined;
    private records!: IRecordData[];

    constructor() {
    }

    async init(context: IControlData<IRecordSourceParams>, config?: JSON | undefined): Promise<void> {
        this.context = context;
        this.config = config;
    };

    getRecordSourceInfo(): IRecordSourceInfo {
        return {
            name: MyRecordSource.name
        };
    };

    async getRecordsData(request: IRecordsDataRequest, filter?: IFilterRequest | undefined): Promise<IRecordsDataResponse> {
        this.records = this.records ?? [{
            id: "1",
            data: JSON.stringify({ name: "Record 1" }),
            sortDateValue: new Date()
        }]; // insert getting data here instead of this dummy data

        const response = {
            requestId: request.requestId,
            records: this.records
        }

        return response;
    }

    async getFilterDetails(filter?: IFilterRequest | undefined): Promise<IFilterGroup[]> {
        return filter?.filterData ?? [];
    }

    getRecordUX(recordData: IRecordData, request: IRecordUXRequest): IRecordUX {
        const data = JSON.parse(recordData.data) as IRecord;
        return {
            id: recordData.id,
            commands: [],
            moduleName: this.getRecordSourceInfo().name,
            header: { components: this.createHeader(recordData.id, data) },
            body: { components: this.createBody(recordData.id, data) },
            footer: { components: this.createFooter(recordData.id, data) },
            accessibleName: `${this.getRecordSourceInfo().name}: ${recordData.id}`,
            icon: this.createIcon(),
            sortDateValue: recordData.sortDateValue
        };
    }

    createIcon(): IRecordIconData {
        return {
            type: IconOption.TaskIcon, 
            accessibleName: this.getRecordSourceInfo().name + "_icon"
        };
    }

    createHeader(recordId: string, data: IRecord) {
        return this.context.factory.createElement(
            "Label",
            { key: `${this.getRecordSourceInfo().name}_${recordId}_header` },
            `Header: ${data.name}`
        );
    }

    createBody(recordId: string, data: IRecord) {
        return this.context.factory.createElement(
            "Label",
            { key: `${this.getRecordSourceInfo().name}_${recordId}_body` },
            `Body: ${data.name}`
        );
    }

    createFooter(recordId: string, data: IRecord) {
        return this.context.factory.createElement(
            "Label",
            { key: `${this.getRecordSourceInfo().name}_${recordId}_footer` },
            `Footer: ${data.name}`
        );
    }

    getRecordCreate?(): IRecordCreate[] {
        return [];
    }
}