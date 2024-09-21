import { HookManager } from '../../generated/schema';

import { CLARITY_HOOK, NATIVE, ZERO_BI } from '../utils/constants.template';

export function getHookManager(): HookManager {
  let stat = HookManager.load(CLARITY_HOOK);

  if (!stat) {
    stat = new HookManager(CLARITY_HOOK);
    stat.worldId = NATIVE;
    stat.externalNullifier = ZERO_BI;
    stat.totalPoints = ZERO_BI;
    stat.totalAttestations = ZERO_BI;

    stat.save();
  }

  return stat;
}
