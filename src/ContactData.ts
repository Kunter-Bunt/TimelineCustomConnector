import { IControlData, IRecordData, IRecordsDataRequest, IRecordsDataResponse, IRecordSourceParams } from "./types/Interfaces";
import { IRecord } from "./types/Record";

export class ContactData {
    private context: IControlData<IRecordSourceParams>;

    constructor(context: IControlData<IRecordSourceParams>) {
        this.context = context;
    }

    async getRecordsData(request: IRecordsDataRequest): Promise<IRecordData[]> {
        let data = await this.getData();

        return data.map(this.mapRecord);
    }

    private async getData(): Promise<IRecord[]> {
        let accountId = this.context.page.entityId;
        let filter = `$filter=_parentcustomerid_value eq ${accountId}`
        let select = `$select=contactid,fullname,modifiedon,emailaddress1,gendercode`;
        let contacts = await this.context.webAPI.retrieveMultipleRecords("contact", `?${filter}&${select}`);
        return contacts.entities.map(this.mapContact);
    }

    private mapContact(contact: any): IRecord {
        let record = {
            id: contact.contactid,
            name: contact.fullname,
            email: contact.emailaddress1,
            gender: contact.gendercode,
            date: contact.modifiedon
        };

        return record;
    }

    private mapRecord(record: IRecord): IRecordData {
        let recordData = {
            data: JSON.stringify(record),
            id: record.id,
            sortDateValue: record.date
        };

        return recordData;
    }
}