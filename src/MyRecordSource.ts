import { IControlData, IFilterGroup, IFilterRequest, IRecordCreate, IRecordData, IRecordIconData, IRecordSource, IRecordSourceInfo, IRecordSourceParams, IRecordUX, IRecordUXRequest, IRecordsDataRequest, IRecordsDataResponse } from "./types/Interfaces";
import { IconOption } from "./types/Enums";
import { Data } from "./Data";
import { IConfiguration } from "./types/Configuration";

export class MyRecordSource implements IRecordSource {
    private context?: IControlData<IRecordSourceParams>;
    private config!: IConfiguration;
    private records!: IRecordData[];
    private data!: Data;

    constructor() {
    }

    async init(context: IControlData<IRecordSourceParams>, config?: JSON): Promise<void> {
        this.context = context;
        this.config = config as IConfiguration ?? {};
        this.data = new Data(context, this.config);
    };

    getRecordSourceInfo(): IRecordSourceInfo {
        return {
            name: MyRecordSource.name
        };
    };

    async getRecordsData(request: IRecordsDataRequest, filter?: IFilterRequest): Promise<IRecordsDataResponse> {
        this.records = this.records ?? await this.data?.getRecordsData(request);

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
        const data = JSON.parse(recordData.data);
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

    createHeader(recordId: string, data: any) {
        return this.context?.factory.createElement(
            "Label",
            { key: `${this.getRecordSourceInfo().name}_${recordId}_header` },
            `Header: ${data[this.config.headerField]}`
        ) ?? [];
    }

    createBody(recordId: string, data: any) {
        return this.context?.factory.createElement(
            "Label",
            { key: `${this.getRecordSourceInfo().name}_${recordId}_body` },
            `Body: ${data[this.config.bodyField]}`
        ) ?? [];
    }

    createFooter(recordId: string, data: any) {
        return this.context?.factory.createElement(
            "Label",
            { key: `${this.getRecordSourceInfo().name}_${recordId}_footer` },
            `Footer: ${data[this.config.footerField]}`
        ) ?? [];
    }

    getRecordCreate?(): IRecordCreate[] {
        return [];
    }
}