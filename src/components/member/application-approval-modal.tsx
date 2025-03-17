import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ApplicationApprovalModalProps {
  headerLabel: string;
  type: "approve" | "reject";
  children?: React.ReactNode;
}

export function ApplicationApprovalModal({
  children,
  type,
  headerLabel,
}: ApplicationApprovalModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-10 rounded-lg">저장</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] p-0">
        <DialogHeader className="p-5 border-b">
          <DialogTitle>{headerLabel}</DialogTitle>
        </DialogHeader>

        {type === "approve" ? (
          <div className="grid px-5">
            <div className="grid grid-cols-4 items-center border border-b-0">
              <div className="bg-secondary p-3">회원번호</div>
              <div className="col-span-3 px-4">abc111</div>
            </div>
            <div className="grid grid-cols-4 items-center border border-b-0">
              <div className="bg-secondary p-3">회원명/법인명</div>
              <div className="col-span-3 px-4">김길동</div>
            </div>
            <div className="grid grid-cols-4 items-center border border-b-0">
              <div className="bg-secondary p-3">투자유형</div>
              <div className="col-span-3 px-2">
                <Select>
                  <SelectTrigger className="w-[300px]">
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
            <div className="grid grid-cols-4 items-center border">
              <div className="bg-secondary p-3">서류첨부</div>
              <div className="col-span-3 px-2">
                <Button variant="secondary" className="border">
                  파일 선택
                </Button>
              </div>
              {/* <Input id="attachDocument" type="file" /> */}
            </div>
            <ul className="list-disc list-inside py-3">
              <li>파일 형식은 jpg, jpeg, gif, png, pdf만 가능합니다.</li>
              <li>최대 10개, 100MB까지 등록이 가능합니다.</li>
            </ul>
          </div>
        ) : (
          <div>Reject</div>
        )}
        <DialogFooter className="sm:justify-center p-5 border-t">
          <Button type="submit" className="px-10 rounded-xl">
            저장
          </Button>
          <Button variant="outline" className="px-10 rounded-xl">
            취소
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
