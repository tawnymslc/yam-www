import React, { useCallback, useEffect } from "react";
import { Box, Button, Modal, ModalActions, ModalContent, ModalProps, ModalTitle, Spacer } from "react-neu";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import UAuth from '@uauth/js'

import metamaskLogo from "assets/metamask-fox.svg";
import walletConnectLogo from "assets/wallet-connect.svg";
import fortmaticLogo from "assets/fortmatic.png";
import portisLogo from "assets/portis.png";

import WalletProviderCard from "./components/WalletProviderCard";

async function handleConnectUD () {
  const uauth = new UAuth({
    clientID: "1a46ffc7-710b-42e7-8ca9-270141cd8a1f",
    redirectUri: "http://localhost:3000",
    scope: "openid wallet"})
  let authorization = null;
  try {
  authorization = await uauth.loginWithPopup()
  }
  catch (error) {
    console.log(error);
  }
  return authorization;
  }

const UnlockWalletModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const { account, connector, connect } = useWallet();

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
                onSelect={handleConnectUD}
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
