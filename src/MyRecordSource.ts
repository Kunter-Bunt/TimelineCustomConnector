import { IRecord } from "./types/Record";
import { IControlData, IFilterGroup, IFilterRequest, IRecordCreate, IRecordData, IRecordIconData, IRecordSource, IRecordSourceInfo, IRecordSourceParams, IRecordUX, IRecordUXRequest, IRecordsDataRequest, IRecordsDataResponse } from "./types/Interfaces";
import { IconOption } from "./types/Enums";
import { ContactData } from "./ContactData";
import { ContactFilter } from "./ContactFilter";

export class MyRecordSource implements IRecordSource {
    private context?: IControlData<IRecordSourceParams>;
    private config?: JSON;
    private records!: IRecordData[];
    private contactData?: ContactData;
    private contactFilter?: ContactFilter;

    constructor() {
    }

    async init(context: IControlData<IRecordSourceParams>, config?: JSON | undefined): Promise<void> {
        this.context = context;
        this.config = config;
        this.contactData = new ContactData(context);
        this.contactFilter = new ContactFilter();
    };

    getRecordSourceInfo(): IRecordSourceInfo {
        return {
            name: MyRecordSource.name
        };
    };

    async getRecordsData(request: IRecordsDataRequest, filter?: IFilterRequest | undefined): Promise<IRecordsDataResponse> {
        this.records = this.records ?? await this.contactData?.getRecordsData(request);
        let filteredRecords = this.contactFilter?.getFilteredRecords(this.records.map(record => JSON.parse(record.data) as IRecord), filter) ?? []
        
        const response = {
            requestId: request.requestId,
            records: this.records.filter(record => filteredRecords.some(filteredRecord => filteredRecord.id === record.id)),
        }

        return response;
    }

    async getFilterDetails(filter?: IFilterRequest | undefined): Promise<IFilterGroup[]> {
        return this.contactFilter?.getFilterDetails(this.records.map(record => JSON.parse(record.data) as IRecord), filter) ?? [];
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
            type: IconOption.ContactEntityIcon, 
            accessibleName: this.getRecordSourceInfo().name + "_icon"
        };
    }

    createHeader(recordId: string, data: IRecord) {
        return this.context?.factory.createElement(
            "Label",
            { key: `${this.getRecordSourceInfo().name}_${recordId}_header` },
            `${data.name}`
        ) ?? [];
    }

    createBody(recordId: string, data: IRecord) {
        return this.context?.factory.createElement(
            "Label",
            { key: `${this.getRecordSourceInfo().name}_${recordId}_body` },
            `${data.email}`
        ) ?? [];
    }

    createFooter(recordId: string, data: IRecord) {
        return this.context?.factory.createElement(
            "Label",
            { key: `${this.getRecordSourceInfo().name}_${recordId}_footer` },
            `${data.date}`
        ) ?? [];
    }

    getRecordCreate?(): IRecordCreate[] {
        return [];
    }
}