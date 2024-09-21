import { Spinner, Typography } from '@ensdomains/thorin'
import styled, { css } from 'styled-components'

import { CheckIcon, CrossIcon } from './Icons'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[1]};
`

const IconWrapper = styled.div<{ status: Status }>(
  ({ status, theme }) => css`
    width: ${theme.space[6]};
    height: ${theme.space[6]};
    color: #fff;
    padding: ${status === 'loading' ? 0 : theme.space[1]};
    border-radius: ${theme.radii.full};
    background-color: ${status === 'success'
      ? theme.colors.green
      : status === 'loading'
      ? 'transparent'
      : status === 'error'
      ? theme.colors.red
      : theme.colors.accentLight};

    & > * {
      width: 100%;
      height: 100%;
    }
  `
)

type Status = 'error' | 'idle' | 'loading' | 'success'

interface StageProps {
  label: string
  status: Status
}

export const Stage = ({ label, status }: StageProps) => {
  return (
    <Container>
      <IconWrapper status={status}>
        {status === 'success' ? (
          <CheckIcon />
        ) : status === 'loading' ? (
          <Spinner color="blue" />
        ) : status === 'error' ? (
          <CrossIcon />
        ) : null}
      </IconWrapper>
      <Typography asProp="span">{label}</Typography>
    </Container>
  )
}
