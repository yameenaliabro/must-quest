"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { DataTablePagination } from "~/components/ui/data-table-pagination";
import { AlertModal } from "../alert-modal";
import { StatusUpdateModal } from "../status-update-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { InvestmentTypeUpdateModal } from "../investment-type-update-modal";
import { DataTableView } from "../ui/data-table-view";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface ShowAlertProps {
  status?: "success" | "warning";
  description: string;
  cancelText?: string | null;
  onOk?: () => void;
}

interface ShowModalProps {
  investmentUpdate?: boolean;
  statusUpdate?: boolean;
}

export function ManageApplications<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [showAlert, setShowAlert] = useState<ShowAlertProps | null>();
  const [showModal, setShowModal] = useState<ShowModalProps | null>();
  const [approvalType, setApprovalType] = useState("");

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleSave = () => {
    if (table.getFilteredSelectedRowModel().rows.length) {
      if (approvalType === "승인완료") {
        const approved = table
          .getFilteredSelectedRowModel()
          .rows.find((row) => row.getValue("status") === "승인완료");

        if (approved) {
          return setShowAlert({
            status: "warning",
            cancelText: null,
            description: "이미 승인 완료된 회원입니다.",
          });
        }

        return setShowAlert({
          status: "warning",
          onOk: () => {
            setTimeout(() => {
              setShowAlert({
                status: "success",
                cancelText: null,
                description: "저장되었습니다.",
              });
            }, 100);
          },
          description: "선택된 2건의 승인상태를 변경하시겠습니까?",
        });
      }

      if (approvalType === "승인거부") {
        const rejected = table
          .getFilteredSelectedRowModel()
          .rows.find((row) => row.getValue("status") === "승인거부");

        if (rejected) {
          return setShowAlert({
            status: "warning",
            cancelText: null,
            description: "이미 승인 거부된 회원입니다.",
          });
        }

        return setShowModal({ statusUpdate: true });
      }

      return setShowModal({ investmentUpdate: true });
    }

    return setShowAlert({
      status: "warning",
      cancelText: null,
      description: "선택된 신청건이 없습니다.",
    });
  };

  return (
    <div className="w-full">
      <div className="sm:flex items-center gap-1 border-b mb-3">
        <div className="grow ">
          <strong className="me-2 text-xl">신청 목록</strong>{" "}
          <small className="text-sm">
            (총 {table.getRowCount()}명 | 승인대기{" "}
            <span className="text-red-500 underline">{1}</span>
            건)
          </small>
        </div>

        <div className="my-3">
          <Select
            value={
              (table.getColumn("status")?.getFilterValue() as string) ?? ""
            }
            onValueChange={(value) => {
              table.getColumn("status")?.setFilterValue(value);
            }}
          >
            <SelectTrigger className="sm:w-[150px]">
              <SelectValue placeholder="승인여부 전체" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="승인대기">승인대기</SelectItem>
              <SelectItem value="승인완료">승인완료</SelectItem>
              <SelectItem value="승인거부">승인거부</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="my-3">
          <Select>
            <SelectTrigger className="sm:w-[150px]">
              <SelectValue placeholder="신청일시순" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="신청일시순">신청일시순</SelectItem>
              <SelectItem value="승인일시순">승인일시순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="my-3">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="sm:w-[150px]">
              <SelectValue
                placeholder={table.getState().pagination.pageSize + "개씩 보기"}
              />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize} 개씩 보기
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="sm:flex justify-between">
        <Button className="w-[100px] bg-[#2a3958] px-[17px] rounded-[10px]">
          등록
        </Button>
        <div className="sm:flex gap-1 items-center">
          <div className="mb-2 mr-3">
            선택한 {table.getFilteredSelectedRowModel().rows.length} 건
          </div>
          <div className="mb-2">
            <Select onValueChange={(value) => setApprovalType(value)}>
              <SelectTrigger className="sm:w-[150px]">
                <SelectValue placeholder="승인상태 변경" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="승인완료">승인완료</SelectItem>
                <SelectItem value="승인거부">승인거부</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-2">
            <Button
              onClick={handleSave}
              className="w-[100px] bg-[#2a3958] px-[17px] rounded-[10px]"
            >
              저장
            </Button>
          </div>
        </div>
      </div>

      <DataTableView table={table} />
      <DataTablePagination table={table} />

      {showAlert && (
        <AlertModal
          show={!!showAlert}
          setShow={() => setShowAlert(null)}
          {...showAlert}
        />
      )}
      {showModal?.statusUpdate && (
        <StatusUpdateModal
          show={showModal.statusUpdate}
          onClose={() => setShowModal({ statusUpdate: false })}
        />
      )}
      {showModal?.investmentUpdate && (
        <InvestmentTypeUpdateModal
          show={showModal.investmentUpdate}
          onClose={() => setShowModal({ investmentUpdate: false })}
        />
      )}
    </div>
  );
}
