"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "../ui/checkbox";
import { InvestmentApp } from "~/types";
import { DocumentViewerModal } from "../document-viewer-modal";

export const columns: ColumnDef<InvestmentApp>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="place-items-start"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "NO",
  },
  {
    accessorKey: "category",
    header: "기존유형",
  },
  {
    accessorKey: "type",
    header: "신청유형",
  },
  {
    accessorKey: "document",
    header: "제출서류",
    cell: ({ row }) => {
      return <DocumentViewerModal />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "신청일시",
  },
  {
    accessorKey: "status",
    header: "승인여부",
    cell: ({ row }) => {
      const status = row.getValue("status") + "";
      return (
        <Badge
          variant={
            status === "승인대기"
              ? "warning"
              : status === "승인완료"
              ? "success"
              : "danger"
          }
          className="whitespace-nowrap"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "remarks",
    header: "승인거부 사유",
    cell: (cellData) => (
      <div className="max-w-[350px]">
        {cellData.getValue() as React.ReactNode}
      </div>
    ),
  },
  {
    accessorKey: "approvedAt",
    header: "승인일시",
  },
];
