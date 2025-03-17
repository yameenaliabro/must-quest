import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export function DocumentViewerModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="whitespace-nowrap p-2 px-4 rounded-lg border border-[#d7d8da] bg-[#ebeef3] cursor-pointer">
          보기
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] sm:max-h-[937px] p-0">
        <DialogHeader className="p-5 border-b">
          <DialogTitle>서류 보기</DialogTitle>
        </DialogHeader>
        <div className="px-5">
          <div className="grid grid-cols-5 items-center border">
            <div className="bg-[#eef0f4] p-3 h-full flex items-center">
              서류 <span className="text-[#ff4d4f]">*</span>
            </div>
            <ScrollArea className="col-span-4 px-3 h-96 ">
              <div className="my-2">
                <div className="border rounded-lg p-3 h-72 sm:h-80 bg-[#fafafa] flex justify-center items-center mb-3">
                  img
                </div>
                <div className="border rounded-lg p-3 h-72 sm:h-80 bg-[#fafafa] flex justify-center items-center">
                  img
                </div>
                <ScrollBar orientation="vertical" />
              </div>
            </ScrollArea>
          </div>
        </div>
        <DialogFooter className="sm:justify-center gap-3 sm:gap-1 p-5 border-t">
          <Button
            variant="outline"
            className="sm:w-[170px] sm:h-[44px] px-[17px] font-bold border border-[#d7d8da] bg-[#ebeef3] rounded-[10px]"
          >
            파일 다운로드
          </Button>
          <Button className="sm:w-[170px] sm:h-[44px] px-[17px] font-bold bg-[#2a3958] rounded-[10px]">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
