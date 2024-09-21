/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi'
import { Helper } from '@ensdomains/thorin'
import { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'

import {
  REGISTRAR_ABI,
  getRegistrarAddress,
  getResolverAddress,
} from '../../../../contracts'
import { Button, Container, Inputs } from '../styles'
import { ConnectAction } from '../../../../types'
import { Header } from '../../Header'
import { Input } from '../../../atoms/Input'
import { getSetAddrData, parseDuration, parseName } from '../../../../utils'
import { useCost, useDebounce, useNormalizeName } from '../../../../hooks'
import { Toggle } from '../../../atoms/Toggle'

interface StartProps {
  connectAction: ConnectAction
  duration: string
  hasHeader: boolean
  isPrimaryNameChecked: boolean
  name: string
  presetName: string | undefined
  secret: `0x${string}`
  setCommitHash: React.Dispatch<React.SetStateAction<Address | null>>
  setDuration: React.Dispatch<React.SetStateAction<string>>
  setIsPrimaryNameChecked: React.Dispatch<React.SetStateAction<boolean>>
  setName: React.Dispatch<React.SetStateAction<string>>
}

export const Start = ({
  connectAction,
  duration,
  hasHeader,
  isPrimaryNameChecked,
  name,
  presetName,
  secret,
  setCommitHash,
  setDuration,
  setIsPrimaryNameChecked,
  setName,
}: StartProps) => {
  const debouncedName = useDebounce<string>(name, 500)
  const debouncedDuration = useDebounce<string>(duration, 500)

  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const resolver = getResolverAddress(chain?.id)
  const registrar = getRegistrarAddress(chain?.id)

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true), []

    if (presetName) {
      setName(presetName)
    }
  })

  const {
    cost,
    isError: isCostError,
    isLoading: isCostLoading,
  } = useCost({
    name: debouncedName,
    duration: debouncedDuration,
    isConnected,
  })

  const available = useContractRead({
    address: registrar as any,
    abi: REGISTRAR_ABI,
    functionName: 'available',
    args: debouncedName ? [parseName(debouncedName)] : undefined,
    enabled: !!debouncedName && !!address,
  })

  const { isNormalized } = useNormalizeName(debouncedName, setName)

  const checkIsValid = () => {
    if (isNormalized === false) {
      return false
    } else if (isNormalized === true) {
      return available.data
    } else {
      return undefined
    }
  }

  const isValid = checkIsValid()

  const makeCommitment = useContractRead({
    address: registrar as any,
    abi: REGISTRAR_ABI,
    functionName: 'makeCommitment',
    args: [
      parseName(debouncedName),
      address || '0x',
      parseDuration(duration) as unknown as BigNumber,
      secret,
      resolver as any,
      [getSetAddrData(address, parseName(debouncedName))],
      isPrimaryNameChecked,
      0,
    ],
    enabled: !!debouncedName && !!address && !!available.data,
  })

  const prepareCommit = usePrepareContractWrite({
    address: registrar as any,
    abi: REGISTRAR_ABI,
    functionName: 'commit',
    args: [makeCommitment.data!],
    enabled: !!makeCommitment.data,
  })

  const commit = useContractWrite(prepareCommit.config)

  useEffect(() => {
    if (commit.data) {
      setCommitHash(commit.data.hash)
    }
  }, [commit.data])

  return (
    <Container
      as="form"
      onSubmit={(e) => {
        e.preventDefault()

        if (!isConnected) {
          connectAction?.(true)
          return
        }

        commit.write?.()
      }}
    >
      {hasHeader && <Header />}

      <Inputs>
        <Input
          type="text"
          label="Name"
          placeholder="MerchantShopName.eth"
          value={name}
          setValue={setName}
          isValid={isValid}
          disabled={!!presetName}
        />

        <Input
          type="number"
          label="Duration"
          placeholder="1 year"
          value={duration}
          setValue={setDuration}
        />

        {/* <Toggle
          label="Set primary name"
          checked={isPrimaryNameChecked}
          onChange={setIsPrimaryNameChecked}
        /> */}
      </Inputs>

      {available.isError || makeCommitment.isError || prepareCommit.isError ? (
        <Helper type="error">
          <div>Unable to read from ENS Registrar</div>
        </Helper>
      ) : !isConnected || !isMounted ? (
        <Button shadow={false} type="submit">
          Connect Wallet
        </Button>
      ) : (
        <>
          <Button
            // colorStyle={commit.isError ? 'redPrimary' : 'accentPrimary'}
            disabled={!commit || !isValid}
            // loading={(isCostLoading && !isCostError) || commit.isLoading}
            suffix={
              cost && !commit.isError ? (
                <span style={{ fontWeight: '300', opacity: '90%' }}>
                  ({cost})
                </span>
              ) : null
            }
            type="submit"
          >
            {commit.isError
              ? 'Error Sending Transaction'
              : commit.isLoading
                ? 'Confirm in Wallet'
                : 'Register for a Domain'}
          </Button>
        </>
      )}
    </Container>
  )
}
