import { IRecord } from "./types/Record";
import { IFilterGroup, IFilterRequest, IRecordCreate, IRecordData, IRecordIconData, IRecordSource, IRecordSourceInfo, IRecordUX, IRecordUXRequest, IRecordsDataRequest, IRecordsDataResponse } from "./types/Interfaces";

export class MyRecordSource implements IRecordSource {
    private context: any;
    private config: JSON | undefined;
    private records!: IRecordData[];

    constructor() {
    }

    async init(context: any, config?: JSON | undefined): Promise<void> {
        this.context = context;
        this.config = config;
    };

    getRecordSourceInfo(): IRecordSourceInfo {
        return {
            name: MyRecordSource.name
        };
    };

    async getRecordsData(request: IRecordsDataRequest, filter?: IFilterRequest | undefined): Promise<IRecordsDataResponse> 
    {
        this.records =  this.records ?? []; // insert getting data here

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
            moduleName: MyRecordSource.name,
            header: { components: this.createHeader(recordData.id, data) },
            body: { components: this.createHeader(recordData.id, data) },
            footer: { components: this.createHeader(recordData.id, data) },
            accessibleName: "TranslationDatasource Record: " + recordData.id,
            icon: this.createIcon(),
            sortDateValue: recordData.sortDateValue
        };
    }

    createIcon(): IRecordIconData{
        return {
            type: 83, 
            accessibleName: MyRecordSource.name + "_icon"
        };
    }

    createHeader(recordId: string, data: IRecord) {
        return this.context.factory.createElement(
            "Label", 
            { key: `${MyRecordSource.name}_${recordId}_header` }, 
            `Header: ${data.name}`
        );
    }

    createBody(recordId: string, data: IRecord) {
        return this.context.factory.createElement(
            "Label", 
            { key: `${MyRecordSource.name}_${recordId}_body` }, 
            `Body: ${data.name}`
        );
    }

    createFooter(recordId: string, data: IRecord) {
        return this.context.factory.createElement(
            "Label", 
            { key: `${MyRecordSource.name}_${recordId}_footer` }, 
            `Footer: ${data.name}`
        );
    }

    getRecordCreate? () : IRecordCreate[] {
        return [];
    }
}