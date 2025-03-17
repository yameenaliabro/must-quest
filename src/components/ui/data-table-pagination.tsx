import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex justify-center items-center space-x-2">
      <Button
        variant="outline"
        size="xs"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to first page</span>
        <ChevronsLeft className="h-4 w-4 p-0" />
      </Button>
      <Button
        variant="outline"
        size="xs"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to previous page</span>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {Array.from({ length: table.getPageCount() }, (_, idx) => idx + 1).map(
        (v) => (
          <Button
            key={v}
            onClick={() => {
              table.setPageIndex(v - 1);
            }}
            variant={
              table.getState().pagination.pageIndex == v - 1
                ? "primary"
                : "ghost"
            }
            size="xs"
          >
            {v}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="xs"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to next page</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="xs"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to last page</span>
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
