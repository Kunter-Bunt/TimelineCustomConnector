export enum FilterGroupType {
    MultiSelect = "MultiSelect",
    SingleSelect = "SingleSelect"
}

export enum FilterGroupName {
    RecordType = "Module",
    ActivityType = "ActivityType",
    ActivityStatus = "ActivityStatus",
    ActivityStatusReason = "StatusReason",
    ActivityDue = "Due",
    PostSource = "SystemVsUsersPosts",
    ModifiedDate = "TLG"
}

export enum RecordTypeGroupOption {
    Notes = "Notes",
    Posts = "Posts",
    Activities = "Activities"
}

export enum ActivityTypeGroupOption {
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

export enum ActivityStatusGroupOption {
    Active = "ActiveAndNotOverdueActivityState",
    Overdue = "Overdue",
    Closed = "Closed"
}

export enum ActivityDueGroupOption {
    Next30Days = "Next30Days",
    Next7Days = "Next7Days",
    Next24Hours = "Next24Hours",
    Last24Hours = "Last24Hours",
    Last7Days = "Last7Days",
    Last30Days = "Last30Days"
}

export enum PostSourceGroupOption {
    AutoPost = "System",
    UserPost = "Users"
}

export enum ModifiedDateGroupOption {
    Last24Hours = "Last24Hours",
    Last7Days = "Last7Days",
    Last30Days = "Last30Days"
}

export enum ActivityStatusReasonGroupOption {
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
