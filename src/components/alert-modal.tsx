"use client";

import { CircleCheck, X } from "lucide-react";
import { BsExclamation, BsInfoCircle } from "react-icons/bs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

interface AlertModalProps {
  show?: boolean;
  setShow?: () => void;
  status?: "success" | "warning";
  buttonLabel?: string;
  headerLabel?: string;
  description: string;
  okText?: string | null;
  onOk?: () => void;
  cancelText?: string | null;
  onCancel?: () => void;
}

export function AlertModal({
  show = false,
  setShow,
  status = "success",
  buttonLabel = "저장",
  headerLabel,
  description,
  okText = "확인",
  onOk,
  cancelText = "취소",
  onCancel,
}: AlertModalProps) {
  return (
    <AlertDialog open={show} onOpenChange={setShow}>
      <AlertDialogContent className="sm:w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex gap-3 items-center">
            {status === "success" ? (
              <div className="w-[30px] h-[30px] bg-[#ecfdf3] rounded-full flex justify-center items-center">
                <CircleCheck className="border-2 border-[#d1fadf] text-[#039855] rounded-full" />
              </div>
            ) : status === "warning" ? (
              <BsExclamation className="w-[26px] h-[26px] bg-[#FEF0C7] text-[#D46B08] rounded-full ring-4 ring-[#FFFAEB]" />
            ) : (
              <BsInfoCircle size={20} className="bg-secondary rounded-full" />
            )}
            <div className="grow">{headerLabel}</div>
            <AlertDialogCancel className="w-6 h-6 p-0 border-0 hover:bg-transparent">
              <X
                size={24}
                className="text-[#667085] hover:text-gray-700 cursor-pointer"
              />
            </AlertDialogCancel>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="mb-4 text-xl font-bold text-gray-900">
          {description}
        </AlertDialogDescription>
        <AlertDialogFooter className="sm:flex sm:justify-center gap-3 sm:gap-1">
          {okText && (
            <AlertDialogAction
              onClick={onOk}
              className="sm:w-[170px] sm:h-[44px] px-[17px] font-bold bg-[#2a3958] rounded-[10px]"
            >
              {okText}
            </AlertDialogAction>
          )}
          {cancelText && (
            <AlertDialogCancel className="sm:w-[170px] sm:h-[44px] px-[17px] font-bold border border-[#2a3958] rounded-[10px]">
              {cancelText}
            </AlertDialogCancel>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
