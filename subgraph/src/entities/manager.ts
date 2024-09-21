import { Manager } from '../../generated/schema';
import { CLARITY_MANAGER, NATIVE, ZERO_BI } from '../utils/constants.template';

export function getManager(): Manager {
  let stat = Manager.load(CLARITY_MANAGER);

  // Should not enter here
  if (!stat) {
    stat = new Manager(CLARITY_MANAGER);
    stat.orderCount = ZERO_BI;
    stat.settledOrderCount = ZERO_BI;
    stat.reviewedOrderCount = ZERO_BI;
    stat.txCount = ZERO_BI;
    stat.merchantCount = ZERO_BI;
    stat.payeeCount = ZERO_BI;
    stat.owner = NATIVE;
    stat.spAddress = NATIVE;
    stat.spHook = NATIVE;
    stat.baseCurrency = NATIVE;

    stat.save();
  }

  return stat;
}
