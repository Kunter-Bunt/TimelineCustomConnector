import { FilterGroupName, FilterGroupType } from "./types/Enums";
import { IFilterGroup, IFilterRequest } from "./types/Interfaces";
import { IRecord } from "./types/Record";

export class ContactFilter {
    private readonly contacts = "Contacts";
    private readonly gender = "Gender";
    private readonly male = "Male";
    private readonly maleNumber = "1";
    private readonly female = "Female";
    private readonly femaleNumber = "2";

    private readonly filterExecutors: { [key: string]: (record: IRecord, selectedFilter: ISelectedFilter) => boolean } = {
        [FilterGroupName.RecordType]: this.filterModule,
        [this.gender]: this.filterGender
    };

    constructor() {
    }

    getFilterDetails(records: IRecord[], filter?: IFilterRequest): Promise<IFilterGroup[]> {
        let filters = [
            {
                name: FilterGroupName.RecordType,
                type: FilterGroupType.MultiSelect,
                options: [
                    {
                        value: this.contacts,
                        label: this.contacts,
                        count: this.getFilteredRecords(records, filter,
                            {
                                name: FilterGroupName.RecordType,
                                value: this.contacts,
                                type: FilterGroupType.MultiSelect,
                            }).length,
                    }
                ]
            },
            {
                name: this.gender,
                type: FilterGroupType.SingleSelect,
                options: [
                    {
                        label: this.male,
                        value: this.maleNumber,
                        count: this.getFilteredRecords(records, filter,
                            {
                                name: this.gender,
                                value: this.maleNumber,
                                type: FilterGroupType.SingleSelect,
                            }).length,
                    },
                    {
                        label: this.female,
                        value: this.femaleNumber,
                        count: this.getFilteredRecords(records, filter,
                            {
                                name: this.gender,
                                value: this.femaleNumber,
                                type: FilterGroupType.SingleSelect,
                            }).length,
                    }
                ]
            },
        ];
        return Promise.resolve(filters);
    }

    getFilteredRecords(records: IRecord[], filter?: IFilterRequest, additional?: IAdditionalFilter): IRecord[] {
        let selectedFilters = this.getSelectedFilters(filter, additional);

        let filteredRecords = records;
        selectedFilters?.forEach(selectedFilter => {
            let filterExecutor = this.filterExecutors[selectedFilter.name]?.bind(this);
            if (filterExecutor)
                filteredRecords = filteredRecords.filter(record => filterExecutor(record, selectedFilter));
        });

        return filteredRecords;
    }

    private filterModule(record: IRecord, selectedFilter: ISelectedFilter): boolean {
        return selectedFilter.options.some(val => val.value === this.contacts);
    }

    private filterGender(record: IRecord, selectedFilter: ISelectedFilter): boolean {
        return selectedFilter.options.some(val => val.value === record.gender.toString());
    }

    private getSelectedFilters(filter?: IFilterRequest, additional?: IAdditionalFilter): ISelectedFilter[] {
        let selectedFilters = [] as ISelectedFilter[];

        filter?.filterData?.forEach(group => {
            if (group.options?.some(option => option.isSelected)) {
                selectedFilters.push({
                    name: group.name,
                    options: group.options
                        .filter(option => option.isSelected)
                        .map(option => { return { value: option.value } })
                });
            }
        });

        if (additional) {
            let existing = selectedFilters.find(filter => filter.name === additional.name);

            if (existing && additional.type === FilterGroupType.MultiSelect) // append
                existing.options.push({ value: additional.value });
            else if (existing && additional.type === FilterGroupType.SingleSelect) // replace
                existing.options = [{ value: additional.value }];
            else // add
                selectedFilters.push({
                    name: additional.name,
                    options: [{ value: additional.value }]
            });
        }

        return selectedFilters;
    }
}

interface ISelectedFilter {
    name: string;
    options: ISelectedOption[];
}

interface ISelectedOption {
    value: string;
}

interface IAdditionalFilter {
    name: string;
    value: string;
    type: FilterGroupType;
}