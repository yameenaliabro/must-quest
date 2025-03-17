import { getInvestmentApplications } from "~/actions/get-investment-applications";
import { ManageApplications } from "./ManageApplicaions";
import { columns } from "./columns";

export default async function Investments() {
  const data = await getInvestmentApplications();

  return (
    <div className="py-6">
      <ManageApplications columns={columns} data={data} />
    </div>
  );
}
