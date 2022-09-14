import {UAuthConnector} from '@uauth/web3-react'
import {InjectedConnector} from '@web3-react/injected-connector'
import {WalletConnectConnector} from '@web3-react/walletconnect-connector'
import type {AbstractConnector} from '@web3-react/abstract-connector'

export const injected = new InjectedConnector({supportedChainIds: [1]})

export const walletconnect = new WalletConnectConnector({
  infuraId: "a08b1d86979c4f37912700de944206b4",
  qrcode: true,
})

export const uauth = new UAuthConnector({
  clientID: "1a46ffc7-710b-42e7-8ca9-270141cd8a1f",
  redirectUri: "http://localhost:3000",
  // Scope must include openid and wallet
  scope: 'openid wallet',

  // Injected and walletconnect connectors are required.
  connectors: {injected, walletconnect},
})

const connectors: Record<string, AbstractConnector> = {
  injected,
  walletconnect,
  uauth,
}

export default connectors