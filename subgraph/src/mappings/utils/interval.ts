/* eslint-disable prefer-const */
import { ethereum, Bytes } from '@graphprotocol/graph-ts';
// Schema
import { PoolHourData } from '../../../generated/schema';
// Constants/Helpers
import { ONE_BI, SECONDS_PER_HOUR, ZERO_BI } from '../../utils/constants.template';
import { getPoolHourId } from '../../utils/helper';
import { getPool } from '../../entities/pool';

export function updatePoolDataByHour(
  event: ethereum.Event,
  unformattedPoolKey: Bytes
): void {
  let timestamp = event.block.timestamp.toI32();
  let hourIndex = timestamp / SECONDS_PER_HOUR;
  // Get pool Hour ID
  let poolHourId = getPoolHourId(hourIndex, unformattedPoolKey.toHexString());
  let hourStartUnix = hourIndex * SECONDS_PER_HOUR;

  // Get pool entry
  let pool = getPool(unformattedPoolKey.toHexString());
  if (pool == null) {
    throw '[UPDATE POOL DATA BY HOUR ERROR]: pool not initialized yet.';
  }

  let poolHourData = PoolHourData.load(poolHourId);
  if (poolHourData == null) {
    poolHourData = new PoolHourData(poolHourId);
    poolHourData.periodStartUnix = hourStartUnix;
    poolHourData.pool = pool.id;
    poolHourData.txCount = ZERO_BI;
    poolHourData.open = pool.token0Price;
    poolHourData.high = pool.token0Price;
    poolHourData.low = pool.token0Price;
    poolHourData.close = pool.token0Price;
  }

  if (pool.token0Price.gt(poolHourData.high)) {
    poolHourData.high = pool.token0Price;
  }
  if (pool.token0Price.lt(poolHourData.low)) {
    poolHourData.low = pool.token0Price;
  }

  poolHourData.liquidity = pool.liquidity;
  poolHourData.sqrtPrice = pool.sqrtPrice;
  poolHourData.token0Price = pool.token0Price;
  poolHourData.token1Price = pool.token1Price;
  poolHourData.close = pool.token0Price;
  poolHourData.tick = pool.curTick;
  poolHourData.txCount = poolHourData.txCount.plus(ONE_BI);

  poolHourData.save();
}
