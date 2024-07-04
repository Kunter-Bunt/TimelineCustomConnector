import { FilterGroupName, FilterGroupType, RecordTypeGroupOption, ActivityTypeGroupOption, ActivityStatusGroupOption, ActivityDueGroupOption, PostSourceGroupOption, ModifiedDateGroupOption, ActivityStatusReasonGroupOption } from "./Enums";

export interface IRecordSource {
    //init: (context: ControlData<IRecordSourceParams>, config?: JSON) => Promise<void>;
    init: (context: any, config?: JSON) => Promise<void>; // TODO
    getRecordSourceInfo: () => IRecordSourceInfo;
    getRecordsData: (request: IRecordsDataRequest, filter?: IFilterRequest) => Promise<IRecordsDataResponse>;
    getFilterDetails?: (filter?: IFilterRequest) => Promise<IFilterGroup[]>;
    getRecordUX: (recordData: IRecordData, request: IRecordUXRequest) => IRecordUX;
    getRecordCreate?: () => IRecordCreate[];
}

export interface IRecordCreate {
	id: string;
	iconType: number;
	label: string;
	onClick?: (event: Event) => Promise<void | IRecordCreateResponse>;
}

export interface IRecordCreateResponse {
    success?: boolean;
    needRefresh?: boolean;
    errorMessage?: string;
}

export interface IRecordSourceParams {
    controlId: string;
    tableContext?: {
        name: string;
        id: string;
    };
    getTwoLetterInitialsFromUserName: (userName: string) => string;
    refetchRerenderRecords: () => void;
    sanitizeContent: (content: string) => string;
}

export interface IRecordSourceInfo {
    name: string;
}

export interface IRecordsDataRequest {
    requestId: string;
    tableContext?: {
        name: string;
        id: string;
    };
    pageSize: number;
    isAscending: boolean;
    lastRefetchedTime: Date;
    lastItem?: IRecordData;
    continuationToken?: string;
}

export interface IFilterRequest {
    filterData: IFilterGroup[];
    searchKey?: string;
}

export interface IRecordsDataResponse {
    requestId: string;
    records: IRecordData[];
    continuationToken?: string;
    filtersData?: IFilterGroup[];
}

export interface IFilterGroup {
    name: string | FilterGroupName;
    label?: string;
    type: string | FilterGroupType;
    isExpanded?: boolean;
    options?: IFilterOption[];
}

interface IFilterOption {
    value: string | RecordTypeGroupOption | ActivityTypeGroupOption | ActivityStatusGroupOption | ActivityDueGroupOption | PostSourceGroupOption | ModifiedDateGroupOption | ActivityStatusReasonGroupOption;
    label?: string;
    count?: number;
    isSelected?: boolean;
}

export interface IRecordData {
    id: string;
    sortDateValue?: string;
    data: string;
}

export interface IRecordUXRequest {
    isExpanded: boolean;
}

export interface IRecordField {
    //components: Component[];
    components: any[]; // TODO
}

export interface IRecordIconData {
    type: number; // TODO
    accessibleName: string;
}

export interface IRecordPersonaBubbleData {
    initials?: string;
    accessibleName: string;
}

export interface IRecordUX {
    id: string;
    profilePicture?: IRecordPersonaBubbleData;
    icon: IRecordIconData;
    //bubbleIcon?: Mscrm.Component;
    bubbleIcon?: any; // TODO
    header: IRecordField;
    //headerIcon?: Mscrm.Component;
    headerIcon?: any; // TODO
    body: IRecordField;
    footer: IRecordField;
    commands?: IRecordCommand[];
    accessibleName: string;
    moduleName: string;
    sortDateValue?: string;
}

export interface IRecordCommand {
    iconType: number;
    title?: string;
    label: string;
    onClick?: Function;
    command: string;
    commandType: "BUTTON" | "HYPERLINK";
    href?: string;
}
