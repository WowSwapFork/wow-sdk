import { SupportedChainId } from './chains'
import contractNetworks from '@wowswapfork/contracts/networks.json'
const { GPv2Settlement } = JSON.parse(contractNetworks as unknown as string) as typeof contractNetworks

export const BUY_ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
export const EXTENSIBLE_FALLBACK_HANDLER = '0x2f55e8b20D0B9FEFA187AA7d00B6Cbe563605bF5'
export const COMPOSABLE_COW = '0x5d84eB96e4D57fB2a7945f32be7401237eD243ad'

/**
 * The list of supported chains.
 */
export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.GOERLI,
  SupportedChainId.GNOSIS_CHAIN,
  SupportedChainId.MUMBAI,

]

/**
 * An object containing the addresses of the CoW Protocol settlement contracts for each supported chain.
 */
export const COW_PROTOCOL_SETTLEMENT_CONTRACT_ADDRESS = ALL_SUPPORTED_CHAIN_IDS.reduce<Record<number, string>>(
  (acc, chainId) => ({
    ...acc,
    [chainId]: GPv2Settlement[chainId].address,
  }),
  {}
)

/**
 * An object containing the addresses of the `ExtensibleFallbackHandler` contracts for each supported chain.
 */
export const EXTENSIBLE_FALLBACK_HANDLER_CONTRACT_ADDRESS = ALL_SUPPORTED_CHAIN_IDS.reduce<Record<number, string>>(
  (acc, chainId) => ({
    ...acc,
    [chainId]: EXTENSIBLE_FALLBACK_HANDLER,
  }),
  {}
)

/**
 * An object containing the addresses of the `ComposableCow` contracts for each supported chain.
 */
export const COMPOSABLE_COW_CONTRACT_ADDRESS = ALL_SUPPORTED_CHAIN_IDS.reduce<Record<number, string>>(
  (acc, chainId) => ({
    ...acc,
    [chainId]: COMPOSABLE_COW,
  }),
  {}
)
