export type InvestmentApp = {
  id: string;
  category: string;
  type: string;
  document: string;
  createdAt: string;
  status: "승인대기" | "승인거부" | "승인완료";
  remarks: string;
  approvedAt: string;
};
