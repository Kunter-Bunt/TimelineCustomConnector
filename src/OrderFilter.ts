import { FilterGroupName, FilterGroupType } from "./types/Enums";
import { IFilterGroup, IFilterRequest } from "./types/Interfaces";
import { IOrder } from "./types/Record";

export class OrderFilter {
    private readonly orders = "SalesOrders";
    private readonly statusCode = "StatusCode";
    private readonly new = "New";
    private readonly newNumber = "1";
    private readonly pending = "Pending";
    private readonly pendingNumber = "2";
    private readonly onHold = "OnHold";
    private readonly onHoldNumber = "690970000";
    private readonly filterExecutors: { [key: string]: (record: IOrder, selectedFilter: ISelectedFilter) => boolean } = {
        [FilterGroupName.RecordType]: this.filterModule,
        [this.statusCode]: this.filterStatusCode
    };

    constructor() {
    }

    getFilterDetails(records: IOrder[], filter?: IFilterRequest): Promise<IFilterGroup[]> {
        let filters = [
            {
                name: FilterGroupName.RecordType,
                type: FilterGroupType.MultiSelect,
                options: [
                    {
                        value: this.orders,
                        label: this.orders,
                        count: this.getFilteredRecords(records, filter,
                            {
                                name: FilterGroupName.RecordType,
                                value: this.orders,
                                type: FilterGroupType.MultiSelect,
                            }).length,
                    }
                ]
            },
            {
                name: this.statusCode,
                type: FilterGroupType.SingleSelect,
                options: [
                    {
                        label: this.new,
                        value: this.newNumber,
                        count: this.getFilteredRecords(records, filter,
                            {
                                name: this.statusCode,
                                value: this.newNumber,
                                type: FilterGroupType.SingleSelect,
                            }).length,
                    },
                    {
                        label: this.pending,
                        value: this.pendingNumber,
                        count: this.getFilteredRecords(records, filter,
                            {
                                name: this.statusCode,
                                value: this.pendingNumber,
                                type: FilterGroupType.SingleSelect,
                            }).length,
                    },
                    {
                        label: this.onHold,
                        value: this.onHoldNumber,
                        count: this.getFilteredRecords(records, filter,
                            {
                                name: this.statusCode,
                                value: this.onHoldNumber,
                                type: FilterGroupType.SingleSelect,
                            }).length,
                    }
                ]
            }
        ];
        return Promise.resolve(filters);
    }

    getFilteredRecords(records: IOrder[], filter?: IFilterRequest, additional?: IAdditionalFilter): IOrder[] {
        let selectedFilters = this.getSelectedFilters(filter, additional);

        let filteredRecords = records;
        selectedFilters?.forEach(selectedFilter => {
            let filterExecutor = this.filterExecutors[selectedFilter.name]?.bind(this);
            if (filterExecutor)
                filteredRecords = filteredRecords.filter(record => filterExecutor(record, selectedFilter));
        });

        return filteredRecords;
    }

    private filterModule(record: IOrder, selectedFilter: ISelectedFilter): boolean {
        return selectedFilter.options.some(val => val.value === this.orders);
    }

    private filterStatusCode(record: IOrder, selectedFilter: ISelectedFilter): boolean {
        return selectedFilter.options.some(val => val.value === record.statuscode.toString());
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