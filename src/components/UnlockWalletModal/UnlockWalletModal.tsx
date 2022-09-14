import React, { useCallback, useEffect } from "react";
import { Box, Button, Modal, ModalActions, ModalContent, ModalProps, ModalTitle, Spacer } from "react-neu";
import styled from "styled-components";
import { useWallet } from "use-wallet";

import {useWeb3React} from '@web3-react/core'
import {WalletConnectConnector} from '@web3-react/walletconnect-connector'
import connectors from "../../connectors"

import metamaskLogo from "assets/metamask-fox.svg";
import walletConnectLogo from "assets/wallet-connect.svg";
import fortmaticLogo from "assets/fortmatic.png";
import portisLogo from "assets/portis.png";

import WalletProviderCard from "./components/WalletProviderCard";

const UnlockWalletModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const { account, connector, connect } = useWallet();
  const {activate} = useWeb3React();
  let udAccount = false;

  async function connectHandler(connectorId: string) {
    try {
      const udConnector = connectors[connectorId]
      console.log(connectors);
      if (udConnector instanceof WalletConnectConnector && udConnector.walletConnectProvider) {
        udConnector.walletConnectProvider = undefined
      }
      await activate(udConnector)
      udAccount = true;
      localStorage.setItem("walletProvider", connectorId);
    } catch (error) { 
      console.error(error)
    }
}

  const handleConnectMetamask = useCallback(() => {
    connect("injected");
  }, [connect]);

  const handleConnectWalletConnect = useCallback(() => {
    connect("walletconnect");
  }, [connect]);

  const handleConnectFortmatic = useCallback(() => {
    connect("fortmatic");
  }, [connect]);

  const handleConnectPortis = useCallback(() => {
    connect("portis");
  }, [connect]);

  const handleConnectUnstoppable = useCallback(() => {
    connectHandler("uauth");
  }, [connectHandler]);

  useEffect(() => {
    if (account) {
      onDismiss && onDismiss();
    }
    if (connector) {
      localStorage.setItem("walletProvider", connector);
    }
  }, [account, onDismiss]);

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <ModalTitle text="Select a wallet provider." />
      <ModalContent>
        <StyledWalletsWrapper>
          <Box width={'100%'} row>
            <Box flex={1}>
              <WalletProviderCard 
                icon={<img src={metamaskLogo} style={{ height: 32 }} />} 
                name="Metamask" 
                onSelect={handleConnectMetamask} 
              />
            </Box>
            <Spacer />
            <Box flex={1}>
              <WalletProviderCard
                icon={<img src={walletConnectLogo} style={{ height: 24 }} />}
                name="WalletConnect"
                onSelect={handleConnectWalletConnect}
              />
            </Box>
          </Box>
          <Spacer />
          <Box width={'100%'} row>
            <Box flex={1}>
              <WalletProviderCard
                icon={<img src={fortmaticLogo} style={{ height: 24 }} />}
                name="Fortmatic"
                onSelect={handleConnectFortmatic}
              />
            </Box>
            <Spacer />
            <Box flex={1}>
              <WalletProviderCard
                icon={<img src={portisLogo} style={{ height: 24 }} />}
                name="Portis"
                onSelect={handleConnectPortis}
              />
            </Box>
          </Box>
          <Spacer />
          <Box width={'100%'} row>
            <Box flex={1}>
              <WalletProviderCard
                icon={<img src={portisLogo} style={{ height: 24 }} />}
                name="Unstopabble Domains"
                onSelect={handleConnectUnstoppable}
              />
            </Box>
            <Spacer />
            <Box flex={1}>
            </Box>
          </Box>
        </StyledWalletsWrapper>
      </ModalContent>
      <ModalActions>
        <Box flex={1} row justifyContent="center">
          <Button onClick={onDismiss} text="Cancel" variant="secondary" />
        </Box>
      </ModalActions>
    </Modal>
  );
};

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    flex-direction: column;
    flex-wrap: none;
  }
`;

export default UnlockWalletModal;
