"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { AlertModal } from "./alert-modal";

interface StatusUpdateModalProps {
  show?: boolean;
  onClose?: () => void;
}

interface ShowAlertProps {
  status?: "success" | "warning";
  description: string;
  cancelText?: string | null;
  onOk?: () => void;
}

export function StatusUpdateModal({
  show = false,
  onClose,
}: StatusUpdateModalProps) {
  const [showAlert, setShowAlert] = useState<ShowAlertProps | null>();
  const [reason1, setReason1] = useState(false);
  const [reason2, setReason2] = useState(false);
  const [reason3, setReason3] = useState(false);
  const [reason4, setReason4] = useState(false);
  const [reason5, setReason5] = useState(false);
  const [reason6, setReason6] = useState(false);
  const [directInput, setDirectInput] = useState("");

  const handleChange = () => {
    console.log("handle change");
  };

  const handleCheck = () => {
    if (
      (!reason1 && !reason2 && !reason3 && !reason4 && !reason5 && !reason6) ||
      (reason6 && !directInput)
    )
      return setShowAlert({
        status: "warning",
        cancelText: null,
        description: "필수입력항목을 입력해주세요.",
      });
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
      description: "선택된 2명의 승인상태를 변경하시겠습니까?",
    });
  };

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <DialogHeader className="p-5 border-b">
          <DialogTitle>승인거부 사유 입력</DialogTitle>
        </DialogHeader>
        <ScrollArea className="grid px-5 h-96">
          <div className="grid grid-cols-4 sm:grid-cols-5 items-center border border-b-0">
            <div className="bg-[#eef0f4] border-0 border-b border-white p-3">
              회원번호
            </div>
            <div className="col-span-3 sm:col-span-4 px-4">abc111, abc222</div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 items-center border border-b-0">
            <div className="bg-[#eef0f4] border-0 border-b border-white p-3">
              회원명/법인명
            </div>
            <div className="col-span-3 sm:col-span-4 px-4">
              김길동, ㈜가나다라투자
            </div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 items-center border ">
            <div className="bg-[#eef0f4] p-3 h-full flex items-center">
              승인거부 사유
            </div>
            <div className="col-span-3 sm:col-span-4 p-4">
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="reason1"
                  onCheckedChange={(value) => setReason1(!!value)}
                />
                <label htmlFor="reason1" className="leading-none mb-3">
                  서류 식별 불가
                </label>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="reason2"
                  onCheckedChange={(value) => setReason2(!!value)}
                />
                <label htmlFor="reason2" className="leading-none mb-3">
                  필수 서류 누락
                </label>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="reason3"
                  onCheckedChange={(value) => setReason3(!!value)}
                />
                <label htmlFor="reason3" className="leading-none mb-3">
                  서류의 내용이 등록된 회원정보와 다름
                </label>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="reason4"
                  onCheckedChange={(value) => setReason4(!!value)}
                />
                <label htmlFor="reason4" className="leading-none mb-3">
                  서류에 누락된 내용이 있음 (필수정보, 회사직인, 본인날인,
                  본인서명 등)
                </label>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="reason5"
                  onCheckedChange={(value) => setReason5(!!value)}
                />
                <label htmlFor="reason5" className="leading-none mb-3">
                  서류의 유효기간이 초과됨
                </label>
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="reason6"
                  onCheckedChange={(value) => {
                    if (!value) setDirectInput("");
                    setReason6(!!value);
                  }}
                />
                <label htmlFor="reason6" className="leading-none mb-3">
                  직접 입력
                </label>
              </div>
              <Textarea
                placeholder="사유 입력"
                value={directInput}
                onChange={({ target }) => setDirectInput(target.value)}
                disabled={!reason6}
                className={
                  !reason6 ? "bg-gray-300 disabled:cursor-default" : ""
                }
              />
            </div>
          </div>
          <ScrollBar />
        </ScrollArea>
        <DialogFooter className="sm:justify-center gap-3 sm:gap-1 p-5 border-t">
          <Button
            onClick={handleCheck}
            className="sm:w-[170px] px-[17px] font-bold bg-[#2a3958] rounded-[10px]"
          >
            저장
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="sm:w-[170px] px-[17px] font-bold border rounded-[10px]"
          >
            취소
          </Button>
        </DialogFooter>
      </DialogContent>
      {showAlert && (
        <AlertModal
          show={!!showAlert}
          setShow={() => setShowAlert(null)}
          {...showAlert}
        />
      )}
    </Dialog>
  );
}
