import { BigDecimal, BigInt, dataSource, log } from '@graphprotocol/graph-ts';
// Events from ABI
import {
  Initialised,
  MerchantRegistered,
  MerchantUpdate,
  OrderCreated,
  OrderPaymentSettled,
  RevenueWithdrawn,
  ReviewAttested,
} from '../../generated/Clarity/Clarity';
// Schema
import { User, Manager, Order } from '../../generated/schema';
// Helper
import { getManager } from '../entities/manager';
import { NATIVE, ONE_BI, ZERO_BI } from '../utils/constants.template';
import { loadTransaction } from '../entities/transaction';

import { getMerchantUser, getPayee } from '../entities/user';
import { bytes32ToString } from '../utils/helper';

// Initialization Handler
export function handleInitialise(event: Initialised): void {
  let owner = event.params.owner.toHexString();
  let spAddress = event.params.spInstance.toHexString();
  let spHook = event.params.spHook.toHexString();
  let baseCurrency = event.params.baseCurrency.toHexString();

  let manager = new Manager(dataSource.address().toHexString().toLowerCase());

  manager.spAddress = spAddress;
  manager.spHook = spHook;
  manager.baseCurrency = baseCurrency;
  manager.orderCount = ZERO_BI;
  manager.settledOrderCount = ZERO_BI;
  manager.reviewedOrderCount = ZERO_BI;
  manager.txCount = ZERO_BI;
  manager.totalRevenue = ZERO_BI;
  manager.merchantCount = ZERO_BI;
  manager.payeeCount = ZERO_BI;
  manager.owner = owner;

  manager.save();
}

export function handleMerchantRegister(event: MerchantRegistered): void {
  let merchantId = event.params.merchantId;
  let merchantAddress = event.params.merchantAddress.toHexString();

  let merchant = getMerchantUser(merchantId.toI32());

  merchant.address = merchantAddress;

  merchant.save();
}

export function handleMerchantUpdate(event: MerchantUpdate): void {
  let merchantId = event.params.merchantId;
  let newMerchantAddress = event.params.merchantAddress.toHexString();

  let merchant = getMerchantUser(merchantId.toI32());
  merchant.address = newMerchantAddress;

  merchant.save();
}

export function handleOrderCreated(event: OrderCreated): void {
  let orderId = event.params.orderId;
  let orderIdString = bytes32ToString(orderId);
  let merchantId = event.params.merchantId;
  let amount = event.params.amount;

  let creationTx = loadTransaction(event);

  let merchant = getMerchantUser(merchantId.toI32());
  let newOrder = new Order(orderIdString);

  log.info('Order ID String: {}', [orderIdString]); // Logs a readable string, if applicable

  newOrder.orderId = orderId;
  newOrder.merchantId = merchantId.toI32();
  newOrder.merchant = merchant.id;
  newOrder.payee = NATIVE; // null address since not paid yet
  newOrder.reviewAttestationId = ZERO_BI;
  newOrder.amount = amount;
  newOrder.settled = false;
  newOrder.creationTx = creationTx.id;

  newOrder.createdTimestamp = event.block.timestamp;
  newOrder.settledTimestamp = ZERO_BI;
  newOrder.reviewedTimestamp = ZERO_BI;

  newOrder.save();

  let manager = getManager();

  manager.txCount = manager.txCount.plus(ONE_BI);
  manager.orderCount = manager.orderCount.plus(ONE_BI);
  // KIV merchant Count
  manager.save();
}

export function handleOrderPaymentSettled(event: OrderPaymentSettled): void {
  let orderId = event.params.orderId;
  let orderIdString = bytes32ToString(orderId);
  let payeeAddress = event.params.payee.toHexString();

  let paymentTx = loadTransaction(event);

  // Retrieve existing order
  let order = Order.load(orderIdString);
  if (order === null) {
    log.error('[ORDER NOT FOUND IN PAYMENT SETTLED]: {}', [orderId.toString()]);
    return;
  }
  order.payee = payeeAddress;
  order.settled = true;
  order.settledTimestamp = event.block.timestamp;
  order.paymentTx = paymentTx.id;

  order.save();

  // Load merchant & add revenue
  let merchant = getMerchantUser(order.merchantId);

  merchant.completedOrderCount = merchant.completedOrderCount.plus(ONE_BI);
  merchant.revenue = merchant.revenue.plus(order.amount);

  merchant.save();

  // load payee & update
  let payee = getPayee(payeeAddress);

  payee.volume = payee.volume.plus(order.amount);
  payee.settledOrderCount = payee.settledOrderCount.plus(ONE_BI);

  payee.save();

  // load manager to add reveneu
  let manager = getManager();

  manager.totalRevenue = manager.totalRevenue.plus(order.amount);
  manager.settledOrderCount = manager.settledOrderCount.plus(ONE_BI);
  manager.txCount = manager.txCount.plus(ONE_BI);

  manager.save();
}

export function handleReviewAttest(event: ReviewAttested): void {
  let orderId = event.params.orderId;
  let orderIdString = bytes32ToString(orderId);
  let payeeAddress = event.params.payee.toHexString();
  let reviewAttestionId = event.params.attestationId;

  let reviewTx = loadTransaction(event);

  // Retrieve existing order
  let order = Order.load(orderIdString);
  if (order === null) {
    log.error('[ORDER NOT FOUND IN REVIEW ATTESTION]: {}', [orderId.toString()]);
    return;
  }
  order.reviewAttestationId = reviewAttestionId;
  order.reviewedTimestamp = event.block.timestamp;
  order.reviewTx = reviewTx.id;

  order.save();

  // Update payee
  let payee = getPayee(payeeAddress);

  payee.reviewedCount = payee.reviewedCount.plus(ONE_BI);

  payee.save();

  // Update merchant
  let merchant = getMerchantUser(order.merchantId);

  merchant.reviewedOrderCount = merchant.reviewedOrderCount.plus(ONE_BI);
  merchant.save();

  // Manager update
  let manager = getManager();
  manager.txCount = manager.txCount.plus(ONE_BI);
  manager.reviewedOrderCount = manager.reviewedOrderCount.plus(ONE_BI);

  manager.save();
}

export function handleRevenueWithdraw(event: RevenueWithdrawn): void {
  let merchantId = event.params.merchantId;
  let amount = event.params.amount;

  // Update merchant withdrawn amount
  let merchant = getMerchantUser(merchantId.toI32());
  merchant.withdrawn = merchant.withdrawn.plus(amount);

  merchant.save();
}
