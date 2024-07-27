import { FilterGroupName, FilterGroupType, RecordTypeGroupOption, ActivityTypeGroupOption, ActivityStatusGroupOption, ActivityDueGroupOption, PostSourceGroupOption, ModifiedDateGroupOption, ActivityStatusReasonGroupOption, IconOption } from "./Enums";

export interface IRecordSource {
    init: (context: IControlData<IRecordSourceParams>, config?: JSON) => Promise<void>;
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
    components: IComponent[];
}

export interface IRecordIconData {
    type: number | IconOption;
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
    bubbleIcon?: IComponent;
    header: IRecordField;
    headerIcon?: IComponent;
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

export interface IComponent {
    IsVirtualComponent: boolean;
    render: () => HTMLElement;
}

// Interfaces likely incomplete. Fill in as needed from a debug session.
export interface IControlData<T> {
    accessibility: any;
    appSettings: IAppSettings;
    cards: any;
    children: any;
    client: IClientContext;
    communicationChannel: ICommunicationChannel;
    connectors: any;
    copilot: ICopilot;
    decorators: any;
    design: any;
    device: Xrm.Device;
    diagnostics: any;
    events: any;
    externalContext: any;
    factory: IFactory;
    fluentDesignLanguage: any;
    formatting: IFormatting;
    graphApi: IGraphApi;
    intelligenceApi: IIntellingenceApi;
    learningPath: ILearningPath;
    mode: any;
    navigation: Xrm.Navigation;
    offline: any;
    orgSettings: Xrm.OrganizationSettings; // seems like there are more properties than in interface
    page: Xrm.EntityFormPageContext;
    parameters: T;
    performance: any;
    reporting: any;
    resources: IResources;
    theming: any;
    updatedProperties: string[];
    userSettings: Xrm.UserSettings;
    utils: IUtils;
    webAPI: Xrm.WebApiOnline;
}

export interface IUtils {
    setNotification: (message: string, type: string) => string;
    clearNotification: (messageId: string) => void;
}

export interface IResources {
    getResource: (resourceId: string, loader: (res: any) => any, fallback: () => any) => any;
    getString: (resourceId: string) => string;
}

export interface ILearningPath {
    DOMAttributeName: string;
    baseControlId: string;
}

export interface IIntellingenceApi {
    getLabelsForObjectDetectionModelAsync: (e: any) => Promise<any>;
    getOrganizationSettingsAsync: (e: any) => Promise<any>;
    getPreTrainedModelIdAsync: (e: any) => Promise<any>;
    getPredictionSchemaAsync: (e: any, t: any) => Promise<any>;
    hasOrganizationSettingsAsync: () => Promise<any>;
    invokeAiModelActionAsync: (e: any, t: any) => Promise<any>;
    invokeCopilotActionAsync: (e: any, t: any) => Promise<any>;
    invokeGlobalOperationAsync: (e: any, t: any) => Promise<any>;
    predictAsync: (e: any, t: any) => Promise<any>;
}

export interface IGraphApi {
    getDeclaredFeatures: () => string[];
    getFeatureClassName: () => string;
    sendRequest: (e: any, t: any, o: any, n: any, r: any) => Promise<any>;
}

export interface IFormatting {
    formatCurrency: (e: any, t: any, o: any) => string;
    formatDateAsFilterStringInUTC: (e: Date, t: any) => string;
    formatDateLong: (e: Date) => string;
    formatDateLongAbbreviated: (e: Date) => string;
    formatDateShort: (e: Date, t: any) => string;
    formatDateYearMonth: (e: Date) => string;
    formatDecimal: (e: number, t: any) => string;
    formatInteger: (e: number) => string;
    formatLanguage: (e: number) => string;
    formatTime: (e: Date, t: any) => string;
    formatUTCDateTimeToUserDate: (e: Date, t: any) => Date;
    formatUserDateTimeToUTC: (e: Date, t: any) => Date;
    formatUserInput: (e: any, t: any) => string;
    getTimeZoneOffsetInMinutes: (e: Date) => number;
    getWeekOfYear: (e: Date) => number;
    parseDateFromInput: (e: any, t: any) => Date;
    parseDateFromString: (e: string, t: any) => Date;
    parseFormatted: (e: any, t: any, o: any, n: any) => any;
    parseFormattedValue: (e: any, t: any) => any;
}

export interface IFactory {
    createElement: (e: string, t: IComponentContect, o: string) => IComponent[];
    createComponent: (e: string, t: IComponentContect, o: string) => IComponent[];
    bindDOMComponent: (e: string, t: any) => void;
    bindDOMElement: (e: string, t: any) => void;
    createFileObject: (e: string) => IComponent;
    fireEvent: (e: string, t: any) => void;
    getControlDefaultMapping: (e: string, t: any, o: string) => any;
    getPopupService: () => any;
    requestRender: (e: string) => void;
    unbindDOMComponent: (e: string) => void;
    updateComponent: (e: string, t: IComponentContect, o: string) => void;
}

export interface IComponentContect {
    key: string;
}

export interface ICopilot {
    executeCopilotSkill: (e: any, t: any) => any;
    resolvePrediction: (e: any) => any;
    updateBag: (e: any) => any;
}

export interface ICommunicationChannel {
    getAadObjectIdInfos: (e: any) => any;
    getPersonaInfo: (e: any) => any;
    getPresenceMappedField: (e: any) => any;
    getPresenceStatus: (e: any, t: any) => any;
    getProfilePhoto: (e: any, t: any) => any;
    isPresenceEnabled: (e: any) => boolean;
}

export interface IAppSettings {
    getAppSetting: (e: string) => any;
    getIsFluentThemingEnabled: () => boolean;
}

export interface IClientContext extends Xrm.ClientContext {
    allocatedHeight: number;
    allocatedWidth: number;
    dateFormattingInfo: Xrm.DateFormattingInfo;
    disableScroll: boolean;
    fnoDetials: any;
    formFactor: number;
    getUserTimeZoneOffset: () => number;
    ignoreSelfUpdates: () => any;
    isRTL: boolean;
    languageCode: number;
    locale: string;
    numberFormattingInfo: any;
    orgSettings: Xrm.OrganizationSettings;
    setFullScreen: () => void;
    trackContainerResize: () => void;
    userAgent: any;
    userTimeZoneUtcOffsetMinutes: number;
}