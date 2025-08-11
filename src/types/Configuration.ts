export interface IConfiguration extends JSON {
    footerField: any;
    bodyField: any;
    headerField: any;
    sortField: any;
    entityName: string;
    selectFields: string;
    filterField: string;
    idField: string;
}

/*
Task sample configuration:
{
    "footerField": "prioritycode@OData.Community.Display.V1.FormattedValue",
    "bodyField": "description",
    "headerField": "subject",
    "sortField": "createdon",
    "entityName": "task",
    "selectFields": "activityid,createdon,description,subject,prioritycode,activitytypecode",
    "filterField": "_regardingobjectid_value",
    "idField": "activityid"
}

Contact sample configuration:
{
    "footerField": "createdon",
    "bodyField": "lastname",
    "headerField": "firstname",
    "sortField": "createdon",
    "entityName": "contact",
    "selectFields": "contactid,createdon,firstname,lastname",
    "filterField": "_parentcustomerid_value",
    "idField": "contactid"
}
*/