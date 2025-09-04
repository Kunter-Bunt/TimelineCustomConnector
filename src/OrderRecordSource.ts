import { IOrder} from "./types/Record";
import { IControlData, IFilterGroup, IFilterRequest, IRecordCreate, IRecordData, IRecordIconData, IRecordSource, IRecordSourceInfo, IRecordSourceParams, IRecordUX, IRecordUXRequest, IRecordsDataRequest, IRecordsDataResponse } from "./types/Interfaces";
import { IconOption } from "./types/Enums";
import { OrderData } from "./OrderData";
import { OrderFilter } from "./OrderFilter";

export class OrderRecordSource implements IRecordSource {
    private context?: IControlData<IRecordSourceParams>;
    private config?: JSON;
    private records!: IRecordData[];
    private orderData?: OrderData;
    private orderFilter?: OrderFilter;

    constructor() {
    }

    async init(context: IControlData<IRecordSourceParams>, config?: JSON | undefined): Promise<void> {
        this.context = context;
        this.config = config;
        this.orderData = new OrderData(context);
        this.orderFilter = new OrderFilter();
    };

    getRecordSourceInfo(): IRecordSourceInfo {
        return {
            name: OrderRecordSource.name
        };
    };

    async getRecordsData(request: IRecordsDataRequest, filter?: IFilterRequest | undefined): Promise<IRecordsDataResponse> {
        this.records = this.records ?? await this.orderData?.getRecordsData(request);
        let filteredRecords = this.orderFilter?.getFilteredRecords(this.records.map(record => JSON.parse(record.data) as IOrder), filter) ?? []
        
        const response = {
            requestId: request.requestId,
            records: this.records.filter(record => filteredRecords.some(filteredRecord => filteredRecord.id === record.id)),
        }

        return response;
    }

    async getFilterDetails(filter?: IFilterRequest | undefined): Promise<IFilterGroup[]> {
        return this.orderFilter?.getFilterDetails(this.records.map(record => JSON.parse(record.data) as IOrder), filter) ?? [];
    }

    getRecordUX(recordData: IRecordData, request: IRecordUXRequest): IRecordUX {
        const data = JSON.parse(recordData.data) as IOrder;
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

    createHeader(recordId: string, data: IOrder) {
        return this.context?.factory.createElement(
            "Label",
            { key: `${this.getRecordSourceInfo().name}_${recordId}_header` },
            `${data.name}`
        ) ?? [];
    }

    createBody(recordId: string, data: IOrder) {
        return this.context?.factory.createElement(
            "Label",
            { key: `${this.getRecordSourceInfo().name}_${recordId}_body` },
            `${data.description}`
        ) ?? [];
    }

    createFooter(recordId: string, data: IOrder) {
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