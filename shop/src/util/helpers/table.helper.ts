import { FilterRule, Filtering } from "../decorators/filtering.decorator";
import { Pagination } from "../decorators/pagination.decorator";
import { Sorting } from "../decorators/sorting.decorator";

const getPagination = (pagination: Pagination): { take: number, skip: number } => {
    return {
        skip: pagination.offset,
        take: pagination.limit
    }
};

const getOrder = (sort: Sorting) => sort ? { [sort.property]: sort.direction } : {};

const getWhere = (filter: Filtering) => {
    if (!filter) {
        return {};
    }

    if (filter.rule == FilterRule.IS_NULL) return { [filter.property]: { equals: null } };
    if (filter.rule == FilterRule.IS_NOT_NULL) return { [filter.property]: { not: null } };
    if (filter.rule == FilterRule.EQUALS) return { [filter.property]: { equals: filter.value } };
    if (filter.rule == FilterRule.NOT_EQUALS) return { [filter.property]: { not: filter.value } };
    // if (filter.rule == FilterRule.GREATER_THAN) return { [filter.property]: MoreThan(filter.value) };
    // if (filter.rule == FilterRule.GREATER_THAN_OR_EQUALS) return { [filter.property]: MoreThanOrEqual(filter.value) };
    // if (filter.rule == FilterRule.LESS_THAN) return { [filter.property]: LessThan(filter.value) };
    // if (filter.rule == FilterRule.LESS_THAN_OR_EQUALS) return { [filter.property]: LessThanOrEqual(filter.value) };
    // if (filter.rule == FilterRule.LIKE) return { [filter.property]: ILike(`%${filter.value}%`) };
    // if (filter.rule == FilterRule.NOT_LIKE) return { [filter.property]: Not(ILike(`%${filter.value}%`)) };
    // if (filter.rule == FilterRule.IN) return { [filter.property]: In(filter.value.split(',')) };
    // if (filter.rule == FilterRule.NOT_IN) return { [filter.property]: Not(In(filter.value.split(','))) };
}

export { getOrder, getWhere, getPagination }