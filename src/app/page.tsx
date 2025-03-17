import Investments from "~/components/member/Investments";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Home() {
  return (
    <div className="sm:container">
      <div className="border-b py-1 pb-4 mb-2 2xl:px-[60px]">
        <strong className="me-3 text-2xl">회원상세</strong>{" "}
        <small className="text-[#FF4D4F]">*필수항목</small>
      </div>

      <div className="mb-10 2xl:px-[60px]">
        <Tabs defaultValue="investment_type_management">
          <ScrollArea className="">
            <TabsList className="grid grid-flow-col justify-stretch">
              <TabsTrigger value="basic_information_management">
                기본정보 관리
              </TabsTrigger>
              <TabsTrigger value="investment_type_management">
                투자유형 관리
              </TabsTrigger>
              <TabsTrigger value="check_deposit_withdrawal_details">
                입출금내역 조회
              </TabsTrigger>
              <TabsTrigger value="sales_history_inquiry">
                영업내역 조회
              </TabsTrigger>
              <TabsTrigger value="investment_details_inquiry">
                투자내역 조회
              </TabsTrigger>
              <TabsTrigger value="view_bond_details">채권내역 조회</TabsTrigger>
              <TabsTrigger value="sms_management">SMS 관리</TabsTrigger>
              <TabsTrigger value="consultation_history_management">
                상담내역 관리
              </TabsTrigger>
              <TabsTrigger value="1_1_inquiry_history_inquiry">
                1:1문의내역 조회
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <TabsContent value="investment_type_management">
            <Investments />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
