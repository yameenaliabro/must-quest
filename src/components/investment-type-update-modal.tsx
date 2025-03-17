import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { AlertModal } from "./alert-modal";

interface InvestmentTypeUpdateModalModalProps {
  show: boolean;
  onClose: () => void;
}

interface ShowAlertProps {
  status?: "success" | "warning";
  description: string;
  cancelText?: string | null;
  onOk?: () => void;
}

export function InvestmentTypeUpdateModal({
  show,
  onClose,
}: InvestmentTypeUpdateModalModalProps) {
  const [showAlert, setShowAlert] = useState<ShowAlertProps | null>();
  const [investmentType, setInvestmentType] = useState("");

  const handleCheck = () => {
    if (!investmentType)
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
      description: "투자유형을 변경하시겠습니까?",
    });
  };

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 ">
        <DialogHeader className="px-6 pt-7 pb-8 border-b">
          <DialogTitle>투자유형 변경</DialogTitle>
        </DialogHeader>
        <div className="grid px-5 mb-2">
          <div className="grid grid-cols-4 sm:grid-cols-9 items-center border border-b-0">
            <div className="bg-[#eef0f4] col-span-1 sm:col-span-2 px-5 py-3 border-0 border-b border-white">
              회원번호
            </div>
            <div className="col-span-3 sm:col-span-7 px-4">abc111</div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-9 items-center border border-b-0">
            <div className="bg-[#eef0f4] col-span-1 sm:col-span-2 px-5 py-3 border-0 border-b border-white">
              회원명/법인명
            </div>
            <div className="col-span-3 sm:col-span-7 px-4">김길동</div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-9 items-center border border-b-0">
            <div className="bg-[#eef0f4] col-span-1 sm:col-span-2 px-5 py-3 border-0 border-b border-white">
              투자유형
            </div>
            <div className="col-span-3 sm:col-span-7 px-2">
              <Select onValueChange={(value) => setInvestmentType(value)}>
                <SelectTrigger className="sm:w-[280px]">
                  <SelectValue placeholder="선택하다" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="일반개인">일반개인</SelectItem>
                  <SelectItem value="소득적격">소득적격</SelectItem>
                  <SelectItem value="개인전문">개인전문</SelectItem>
                  <SelectItem value="법인">법인</SelectItem>
                  <SelectItem value="여신금융">여신금융</SelectItem>
                  <SelectItem value="P2P온투">P2P온투</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-9 items-center border">
            <div className="bg-[#eef0f4] col-span-1 sm:col-span-2 px-5 py-3">서류첨부</div>
            <div className="col-span-3 sm:col-span-7 px-2">
              <Button variant="secondary" className="border">
                파일 선택
              </Button>
            </div>
            {/* <Input id="attachDocument" type="file" /> */}
          </div>
          <ul className="list-disc list-inside text-xs pl-3 py-3">
            <li>파일 형식은 jpg, jpeg, gif, png, pdf만 가능합니다.</li>
            <li>최대 10개, 100MB까지 등록이 가능합니다.</li>
          </ul>
        </div>
        <DialogFooter className="sm:justify-center gap-3 sm:gap-1 p-5 border-t">
          <Button
            onClick={handleCheck}
            className="sm:w-[160px] sm:h-12 px-[17px] font-bold bg-[#2a3958] rounded-[10px]"
          >
            저장
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="sm:w-[160px] sm:h-12 px-[17px] font-bold border rounded-[10px]"
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
