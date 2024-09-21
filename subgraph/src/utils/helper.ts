import {
  BigDecimal,
  BigInt,
  Entity,
  Value,
  ethereum,
  Bytes,
} from '@graphprotocol/graph-ts';
import { Bundle } from '../../generated/schema';
import { ZERO_BI, ONE_BI, Q192, DEFAULT_DECIMALS, ZERO_BD } from './constants.template';

/* ==================================================
                    Constants
=====================================================*/

/* ==================================================
        Miscellaneous Helper Functions
=====================================================*/
export function abs(number: BigInt): BigInt {
  if (number.lt(ZERO_BI)) {
    number = ZERO_BI.minus(number);
  }
  return number;
}

export function max(a: BigInt, b: BigInt): BigInt {
  if (a.ge(b)) return a;
  return b;
}

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1');
  for (let i = ZERO_BI; i.gt(decimals as BigInt); i = i.minus(ONE_BI)) {
    bd = bd.div(BigDecimal.fromString('10'));
  }

  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'));
  }
  return bd;
}

export function toDecimal(amount: BigInt, decimals: BigInt): BigDecimal {
  return amount.toBigDecimal().div(exponentToBigDecimal(decimals));
}

export function bytes32ToString(bytes: Bytes): string {
  let str = '';
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] == 0) break; // Stop at null character
    str += String.fromCharCode(bytes[i]);
  }
  return str;
}

/* ==================================================
           Miscellenous Helper Functions
=====================================================*/
export function filterArray(id: string, list: string[]): string[] {
  let res = [] as string[];

  for (let i = 0; i < list.length; i++) {
    if (list[i] != id) {
      res.push(list[i]);
    }
  }

  return res;
}

/* ==================================================
            Entity Related Functions
=====================================================*/

export function getLiquidityPositionId(user: string, pair: string): string {
  return `${user}-${pair}`;
}
export function getTransferId(hash: string, logIndex: BigInt, tokenId: BigInt): string {
  return `${hash}-${logIndex}-${tokenId}`;
}

/* ==================================================
            Syncing Index Related
=====================================================*/

export function getNextSyncingIndex(collection: string): BigInt {
  let bundle = Bundle.load(collection);
  if (!bundle) {
    bundle = new Bundle(collection);
    bundle.syncingIndex = BigInt.fromI32(0);
  }

  let newSyncingIndex = bundle.syncingIndex.plus(ONE_BI);
  bundle.syncingIndex = newSyncingIndex;
  bundle.save();

  return newSyncingIndex;
}

export function setSyncingIndex(collection: string, entity: Entity): void {
  let syncingIndex = getNextSyncingIndex(collection);
  entity.set('syncingIndex', Value.fromBigInt(syncingIndex));
}

/* ==================================================
        Transaction Related Helper Functions
=====================================================*/

export function generateTransactionId(event: ethereum.Event): string {
  let blockHash = event.block.hash.toHexString();
  let txHash = event.transaction.hash.toHexString();
  let logIndex = event.logIndex.toString();
  return blockHash + '-' + txHash + '-' + logIndex;
}

/**
 * Set all metadata for an entity such as block number, timestamp.
 */
export function setMetaDataFields(entity: Entity, event: ethereum.Event): void {
  entity.set('txHash', Value.fromString(event.transaction.hash.toHexString()));
  entity.set('blockHash', Value.fromString(event.block.hash.toHexString()));
  entity.set('blockNumber', Value.fromBigInt(event.block.number));
  entity.set('timestamp', Value.fromBigInt(event.block.timestamp));
}

/* ==================================================
          Math Related Helper Functions
=====================================================*/

// return 0 if denominator is 0 in division
export function safeDiv(amount0: BigDecimal, amount1: BigDecimal): BigDecimal {
  if (amount1.equals(ZERO_BD)) {
    return ZERO_BD;
  } else {
    return amount0.div(amount1);
  }
}

/* ==================================================
          Time Related Helper Functions
=====================================================*/
export function getPoolHourId(hourIndex: number, poolKey: string): string {
  return poolKey.concat('-').concat(hourIndex.toString());
}

/* ==================================================
        Uniswap V4 Related Helper Functions
=====================================================*/

export function sqrtPriceX96ToTokenPrices(sqrtPriceX96: BigInt): BigDecimal[] {
  let num = sqrtPriceX96.times(sqrtPriceX96).toBigDecimal();
  let denom = BigDecimal.fromString(Q192.toString());
  // log.critical("num: {}, denom: {}", [num.toString(), denom.toString()]);
  // log.critical("{}", [exponentToBigDecimal(BI_18).toString()]);
  let price1 = num
    .div(denom)
    .times(exponentToBigDecimal(DEFAULT_DECIMALS))
    .div(exponentToBigDecimal(DEFAULT_DECIMALS));

  let price0 = safeDiv(BigDecimal.fromString('1'), price1);
  return [price0, price1];
}
