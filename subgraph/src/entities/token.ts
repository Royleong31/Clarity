import { Address, BigInt } from '@graphprotocol/graph-ts';
// Schemas:
import { ERC20 } from '../../generated/Factory/ERC20';
import { Token } from '../../generated/schema';
// Constants/Helper:
import {
  NATIVE,
  NATIVE_ALT,
  ZERO_BI,
  DEFAULT_DECIMALS,
  ZERO_BD,
} from '../utils/constants.template';

/* ==================================================
                    Main Function
=====================================================*/
export function getToken(address: string): Token {
  let token = Token.load(address);
  if (!token) {
    token = new Token(address);
    token.type = getType(address);
    token.name = getName(address);
    token.symbol = getSymbol(address);
    token.decimals = getDecimals(address);
    token.tradeVolume = ZERO_BD;
    token.swapTxCount = ZERO_BI;

    token.save();
  }
  return token;
}
/* ==================================================
            Helper/Intermediate Functions
=====================================================*/

export function getType(address: string): string {
  if (address == NATIVE || address == NATIVE_ALT) {
    return 'NATIVE';
  }

  return 'ERC20';
}

// Metadata helper functions:
export function getName(address: string): string {
  if (address == NATIVE || address == NATIVE_ALT) {
    return 'ETH';
  }
  let contract = ERC20.bind(Address.fromString(address));
  const result = contract.try_name();

  if (result.reverted) {
    return 'unknown';
  }
  return result.value;
}

export function getSymbol(address: string): string {
  if (address == NATIVE || address == NATIVE_ALT) {
    return 'ETH';
  }
  let contract = ERC20.bind(Address.fromString(address));
  const result = contract.try_symbol();

  if (result.reverted) {
    return 'unknown';
  }
  return result.value;
}

export function getDecimals(address: string): BigInt {
  if (address == NATIVE || address == NATIVE_ALT) {
    return DEFAULT_DECIMALS;
  }
  let contract = ERC20.bind(Address.fromString(address));
  const result = contract.try_decimals();

  if (result.reverted) {
    return DEFAULT_DECIMALS;
  }
  return DEFAULT_DECIMALS;
}
