export const enum FilterGroupType {
    MultiSelect = "MultiSelect",
    SingleSelect = "SingleSelect"
}

export const enum FilterGroupName {
    RecordType = "Module",
    ActivityType = "ActivityType",
    ActivityStatus = "ActivityStatus",
    ActivityStatusReason = "StatusReason",
    ActivityDue = "Due",
    PostSource = "SystemVsUsersPosts",
    ModifiedDate = "TLG"
}

export const enum RecordTypeGroupOption {
    Notes = "Notes",
    Posts = "Posts",
    Activities = "Activities"
}

export const enum ActivityTypeGroupOption {
    Appointment = "4201",
    CampaignActivity = "4402",
    CaseResolution = "4206",
    Email = "4202",
    Fax = "4204",
    Letter = "4207",
    OpportunityClose = "4208",
    OrderClose = "4209",
    PhoneCall = "4210",
    QuoteClose = "4211",
    RecurringAppointment = "4251",
    SocialActivity = "4216",
    Task = "4212",
    CustomerVoiceAlert = "10295",
    CustomerVoiceSurveyInvite = "10305",
    CustomerVoiceSurveyResponse = "10307"
}

export const enum ActivityStatusGroupOption {
    Active = "ActiveAndNotOverdueActivityState",
    Overdue = "Overdue",
    Closed = "Closed"
}

export const enum ActivityDueGroupOption {
    Next30Days = "Next30Days",
    Next7Days = "Next7Days",
    Next24Hours = "Next24Hours",
    Last24Hours = "Last24Hours",
    Last7Days = "Last7Days",
    Last30Days = "Last30Days"
}

export const enum PostSourceGroupOption {
    AutoPost = "System",
    UserPost = "Users"
}

export const enum ModifiedDateGroupOption {
    Last24Hours = "Last24Hours",
    Last7Days = "Last7Days",
    Last30Days = "Last30Days"
}

export const enum ActivityStatusReasonGroupOption {
    Free = "2198156",
    Tentative = "683145742",
    Completed = "601036331",
    Canceled = "-58529607",
    Busy = "2082329",
    OutOfOffice = "-164213037",
    Pending = "982065527",
    InProgress = "-1115514168",
    Aborted = "469875631",
    Proposed = "-928198778",
    Closed = "2021313932",
    SystemAborted = "2106128094",
    Open = "2464362",
    Draft = "66292097",
    Sent = "2573240",
    Received = "-744075775",
    PendingSend = "268330161",
    Sending = "-650390726",
    Failed = "2096857181",
    Scheduled = "1843257485",
    Made = "2390325",
    Requested = "-1597065394",
    Reserved = "-285741240",
    Arrived = "930446413",
    NoShow = "-579192324",
    Processing = "-1879307469",
    NotStarted = "1725055988",
    WaitingOnSomeoneElse = "-1784277931",
    Deferred = "712535039"
}

export const enum IconOption {
    PinIcon = 271,
    UnPinIcon = 325,
    NotesMicrosoftIcon = 206,
    PostsMicrosoftIcon = 104,
    UserPostsMicrosoftIcon = 42,
    ActivitiesMicrosoftIcon = 103,
    ServiceActivityIcon = 205,
    CampaignResolutionIcon = 204,
    CaseResolutionIcon = 203,
    OpportunityIcon = 81,
    AppointmentIcon = 82,
    TeamsAppointmentIcon = 403,
    RecurringAppointmentIcon = 122,
    TaskIcon = 83,
    TaskClipboardIcon = 466,
    PhoneIcon = 66,
    PhoneCallIncomingIcon = 85,
    PhoneCallOutgoingIcon = 86,
    LetterIcon = 411,
    LetterIncomingIcon = 415,
    LetterOutgoingIcon = 416,
    FaxIcon = 412,
    FaxIncomingIcon = 417,
    FaxOutgoingIcon = 418,
    EmailReceivedIcon = 87,
    EmailSentIcon = 88,
    EmailOtherIcon = 125,
    EmailCancelledIcon = 65,
    EmailFailedIcon = 300,
    EmailIcon = 63,
    PlusIcon = 198,
    HorizontalMoreIcon = 12,
    VerticalMoreIcon = 458,
    ExcelIcon = 147,
    PDFIcon = 192,
    AccessIcon = 195,
    OneNoteIcon = 194,
    VisioIcon = 196,
    DocumentIcon = 146,
    PresentationIcon = 193,
    ProjectIcon = 197,
    DelveIcon = 150,
    AudioIcon = 207,
    CameraIcon = 208,
    VideoIcon = 209,
    ImageIcon = 210,
    DefaultAttachmentIcon = 43,
    EditIcon = 4,
    updateIcon = 32,
    DeleteIcon = 6,
    AssignIcon = 79,
    CloseIcon = 97,
    DefaultActivityIcon = 151,
    SearchButtonIcon = 61,
    WarningIcon = 232,
    AccountEntityIcon = 227,
    IncidentEntityIcon = 84,
    OpportunityEntityIcon = 347,
    ContactEntityIcon = 168,
    NotificationIcon = 184,
    ChevronDownIcon = 200,
    ChevronUpIcon = 199,
    NewChevronExpandIcon = 468,
    NewChevronCollapseIcon = 469,
    ThumbsUpIcon = 431,
    ThumbsDownIcon = 432,
    HappySmileyIcon = 202,
    SadSmileyIcon = 201,
    ReplyEmailIcon = 94,
    ReplyAllEmailIcon = 95,
    ForwardEmailIcon = 96,
    BotIcon = 327,
    AddToQueueIcon = 136,
    FilterSolidIcon = 326,
    FilterIcon = 35,
    CheckMarkIcon = 109,
    OpenEntityRecordIcon = 257,
    RefreshIcon = 32,
    ResetIcon = 163,
    UntrackedEmailIcon = 300,
    CheckedMailIcon = 64,
    OpenMailIcon = 301,
    SharePointNewOneNoteDocumentIcon = 222,
    InformationIcon = 179,
    ExpandAllRecordsIcon = 468,
    CollapseAllRecordsIcon = 469,
    OpenChatCommandIcon = 459,
    OpenMainCommandIcon = 72,
    OpenMainActionIcon = 458,
    CommandSmallScreen = 380,
    CommandMediumScreen = 481,
    CopyToClipboardIcon = 76,
    ReassignRecordsIcon = 263,
}