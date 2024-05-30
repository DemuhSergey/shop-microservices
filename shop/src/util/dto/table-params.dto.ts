import { Filtering } from "../decorators/filtering.decorator";
import { Pagination } from "../decorators/pagination.decorator";
import { Sorting } from "../decorators/sorting.decorator";

export interface ITableParamsDto {
    pagination: Pagination,
    sort?: Sorting,
    filter?: Filtering
}