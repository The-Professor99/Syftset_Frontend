import { getAccountModes } from "../../api";
import OverviewDisplay from "./OverviewDisplay";

async function Overview() {
  const accountsDetails = await getAccountModes();
  return <OverviewDisplay accountsDetails={accountsDetails} />;
}

export default Overview;
