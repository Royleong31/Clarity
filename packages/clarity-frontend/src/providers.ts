import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

export const { chains, provider } = configureChains(
  [sepolia],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Web3 Starter',
  chains,
})

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})
