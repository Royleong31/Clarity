export const SECONDS_PER_YEAR = 31556952

export const COMMIT_GAS_AMOUNT = 48000

export const REGISTRATION_GAS_AMOUNT = 300000

export const TOTAL_GAS_AMOUNT = REGISTRATION_GAS_AMOUNT + COMMIT_GAS_AMOUNT

export const getRegistrarAddress = (chainId: number | undefined) => {
  return '0xFED6a969AaA60E4961FCD3EBF1A2e8913ac65B72'
}

export const getResolverAddress = (chainId: number | undefined) => {
  return '0x8FADE66B79cC9f707aB26799354482EB93a5B7dD'
}

export const getReverseRegistrarAddress = (chainId: number | undefined) => {
  return '0xA0a1AbcDAe1a2a4A2EF8e9113Ff0e02DD81DC0C6'
}

export const REGISTRAR_ABI = [
  {
    inputs: [
      {
        internalType: 'contract BaseRegistrarImplementation',
        name: '_base',
        type: 'address',
      },
      {
        internalType: 'contract IPriceOracle',
        name: '_prices',
        type: 'address',
      },
      { internalType: 'uint256', name: '_minCommitmentAge', type: 'uint256' },
      { internalType: 'uint256', name: '_maxCommitmentAge', type: 'uint256' },
      {
        internalType: 'contract ReverseRegistrar',
        name: '_reverseRegistrar',
        type: 'address',
      },
      {
        internalType: 'contract INameWrapper',
        name: '_nameWrapper',
        type: 'address',
      },
      { internalType: 'contract ENS', name: '_ens', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'commitment', type: 'bytes32' }],
    name: 'CommitmentTooNew',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'commitment', type: 'bytes32' }],
    name: 'CommitmentTooOld',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'duration', type: 'uint256' }],
    name: 'DurationTooShort',
    type: 'error',
  },
  { inputs: [], name: 'InsufficientValue', type: 'error' },
  { inputs: [], name: 'MaxCommitmentAgeTooHigh', type: 'error' },
  { inputs: [], name: 'MaxCommitmentAgeTooLow', type: 'error' },
  {
    inputs: [{ internalType: 'string', name: 'name', type: 'string' }],
    name: 'NameNotAvailable',
    type: 'error',
  },
  { inputs: [], name: 'ResolverRequiredWhenDataSupplied', type: 'error' },
  {
    inputs: [{ internalType: 'bytes32', name: 'commitment', type: 'bytes32' }],
    name: 'UnexpiredCommitmentExists',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'string', name: 'name', type: 'string' }],
    name: 'available',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'commitment', type: 'bytes32' }],
    name: 'commit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'duration', type: 'uint256' },
      { internalType: 'bytes32', name: 'secret', type: 'bytes32' },
      { internalType: 'address', name: 'resolver', type: 'address' },
      { internalType: 'bytes[]', name: 'data', type: 'bytes[]' },
      { internalType: 'bool', name: 'reverseRecord', type: 'bool' },
      { internalType: 'uint16', name: 'ownerControlledFuses', type: 'uint16' },
    ],
    name: 'makeCommitment',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minCommitmentAge',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'duration', type: 'uint256' },
      { internalType: 'bytes32', name: 'secret', type: 'bytes32' },
      { internalType: 'address', name: 'resolver', type: 'address' },
      { internalType: 'bytes[]', name: 'data', type: 'bytes[]' },
      { internalType: 'bool', name: 'reverseRecord', type: 'bool' },
      { internalType: 'uint16', name: 'ownerControlledFuses', type: 'uint16' },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'uint256', name: 'duration', type: 'uint256' },
    ],
    name: 'rentPrice',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'base', type: 'uint256' },
          { internalType: 'uint256', name: 'premium', type: 'uint256' },
        ],
        internalType: 'struct IPriceOracle.Price',
        name: 'price',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'reverseRegistrar',
    outputs: [
      { internalType: 'contract ReverseRegistrar', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'name', type: 'string' }],
    name: 'valid',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'pure',
    type: 'function',
  },
] as const

export const REVERSE_REGISTRAR_ABI = [
  {
    inputs: [{ internalType: 'string', name: 'name', type: 'string' }],
    name: 'setName',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
