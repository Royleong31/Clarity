// Schema:
import { User, Payee, Merchant } from '../../generated/schema';
import { NATIVE, ZERO_BI } from '../utils/constants.template';

export function getPayee(address: string): Payee {
  let payee = Payee.load(address);

  if (!payee) {
    payee = new Payee(address);
    payee.user = address;
    payee.volume = ZERO_BI;
    payee.settledOrderCount = ZERO_BI;
    payee.reviewedCount = ZERO_BI;

    payee.save();
  }

  return payee;
}

export function getMerchantUser(id: number): Merchant {
  let merchantIdentifier = id.toString();
  let merchant = Merchant.load(merchantIdentifier);

  if (!merchant) {
    merchant = new Merchant(merchantIdentifier);
    merchant.merchantId = id as i32;
    merchant.address = NATIVE;
    merchant.completedOrderCount = ZERO_BI;
    merchant.reviewedOrderCount = ZERO_BI;
    merchant.revenue = ZERO_BI;
    merchant.withdrawn = ZERO_BI;

    merchant.save();
  }

  return merchant;
}

export function getUser(address: string, type: string): User {
  let user = User.load(address);

  if (!user) {
    user = new User(address);
    user.type = type;

    user.save();
  }

  return user;
}
