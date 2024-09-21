import { log } from '@graphprotocol/graph-ts';
import {
  Initialised,
  UserAttestationRewardMint,
  UserAttestationRewardBurn,
  UserCollectorRegister,
} from '../../generated/ClaritySPHook/ClaritySPHook';
import { AttestationInfo } from '../../generated/schema';
import { getHookManager } from '../entities/hook-manager';
import { getWorldIdUser } from '../entities/world-id-user';
import { ONE_BI } from '../utils/constants.template';

export function handleHookInitialise(event: Initialised): void {
  let worldId = event.params.worldId.toHexString();
  let externalNullifier = event.params.externalNulliflier;

  let hookManager = getHookManager();
  hookManager.worldId = worldId;
  hookManager.externalNullifier = externalNullifier;

  hookManager.save();
}

export function handleUserAttestationRewardMint(event: UserAttestationRewardMint): void {
  let nullifierHash = event.params.nullifierHash;
  let addedPoints = event.params.amount;
  let attestationId = event.params.attestationId;

  let attestation = new AttestationInfo(
    `${nullifierHash.toString()}-${attestationId.toString()}`
  );
  attestation.reviewAttestationId = attestationId;
  attestation.nullifierHash = nullifierHash;
  attestation.revoked = false;

  attestation.save();

  let hookManager = getHookManager();

  hookManager.totalAttestations = hookManager.totalAttestations.plus(ONE_BI);
  hookManager.totalPoints = hookManager.totalPoints.plus(addedPoints);

  hookManager.save();

  let worldIdUser = getWorldIdUser(nullifierHash);
  worldIdUser.points = worldIdUser.points.plus(addedPoints);

  worldIdUser.save();
}

export function handleUserAttestationRewardBurn(event: UserAttestationRewardBurn): void {
  let nullifierHash = event.params.nullifierHash;
  let deductedPoints = event.params.amount;
  let attestationId = event.params.attestationId;
  let id = `${nullifierHash.toString()}-${attestationId.toString()}`;

  let attestation = AttestationInfo.load(id);
  if (attestation === null) {
    log.error('[ATTESTATION NOT FOUND]: {}', [id]);
    return;
  }
  attestation.reviewAttestationId = attestationId;
  attestation.nullifierHash = nullifierHash;
  attestation.revoked = true;

  attestation.save();

  let hookManager = getHookManager();

  hookManager.totalAttestations = hookManager.totalAttestations.plus(ONE_BI);
  hookManager.totalPoints = hookManager.totalPoints.minus(deductedPoints);

  hookManager.save();

  let worldIdUser = getWorldIdUser(nullifierHash);
  worldIdUser.points = worldIdUser.points.minus(deductedPoints);

  worldIdUser.save();
}

export function handleUserCollectorRegister(event: UserCollectorRegister): void {
  let nullifierHash = event.params.nullifierHash;
  let collectorAddress = event.params.collector.toHexString();

  let worldIdUser = getWorldIdUser(nullifierHash);
  worldIdUser.collector = collectorAddress;

  worldIdUser.save();
}
