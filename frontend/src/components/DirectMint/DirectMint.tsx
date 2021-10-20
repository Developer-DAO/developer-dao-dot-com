import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useState,
  useEffect,
} from 'react';
import { useToast, Button, Input, Stack } from '@chakra-ui/react';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import { useTranslation } from 'next-i18next';
import {
  DEVELOPER_DAO_CONTRACT,
  ERROR_CODE_TX_REJECTED_BY_USER,
  MAINNET_NETWORK_ID,
  INFURA_ID,
} from '../../utils/DeveloperDaoConstants';

import MINT_CONTRACT from '../../artifacts/ddao.json';
let _provider: any = null;
let _signer: any = null;
let mint_contract: Partial<ethers.Contract>;

interface DirectMintProps {
  developerId?: string;
}

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
};

// Logic & buttons needed for Direct Minting
// Can be reused anywhere else as needed
const DirectMint = ({ developerId }: DirectMintProps) => {
  const { t } = useTranslation();
  const [userWallet, setUserWallet] = useState('');
  const [tokenID, setTokenID] = useState(developerId ? developerId : '');
  const [networkError, setNetworkError] = useState(false);
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();

  const toast = useToast();

  useEffect(() => {
    const web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: false, // optional
      providerOptions, // required
    });
    setWeb3Modal(web3Modal);
  }, []);

  const fetchAccountData = async () => {
    const _web3 = new ethers.providers.Web3Provider(_provider);
    _signer = _web3.getSigner();
    mint_contract = new ethers.Contract(
      DEVELOPER_DAO_CONTRACT,
      MINT_CONTRACT.abi,
      _signer,
    );

    const accounts = await _web3.listAccounts();
    const { chainId } = await _web3.getNetwork();

    // MetaMask does not give you all accounts, only the selected account
    const selectedAccount = accounts[0];

    setUserWallet(selectedAccount);
    _checkNetwork(chainId);
  };

  const _checkNetwork = (chainId: number) => {
    if (chainId === MAINNET_NETWORK_ID) {
      return true;
    }
    setNetworkError(true);
  };

  const connectWallet = async () => {
    web3Modal?.clearCachedProvider();

    try {
      _provider = await web3Modal?.connect();
    } catch (e) {
      console.log('Could not get a wallet connection', e);
      return;
    }

    // Subscribe to accounts change
    _provider.on('accountsChanged', (accounts: string) => {
      fetchAccountData();
    });

    // Subscribe to chainId change
    _provider.on('chainChanged', (chainId: string) => {
      fetchAccountData();
    });

    // Subscribe to networkId change
    _provider.on('networkChanged', (networkId: string) => {
      setNetworkError(false);
      fetchAccountData();
    });

    await fetchAccountData();
  };

  const tokenNameHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTokenID(event.target.value);
  };

  const createTokenHandler: MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    try {
      // If a transaction fails, we save that error in the component's state.
      // We only save one such error, so before sending a second transaction, we
      // clear it.

      // We send the transaction, and save its hash in the Dapp's state. This
      // way we can indicate that we are waiting for it to be mined.
      const tx = await mint_contract.claim(tokenID);

      //Alert transaction is in progress
      toast({
        title: 'Transaction Being Sent',
        isClosable: true,
      });

      // We use .wait() to wait for the transaction to be mined. This method
      // returns the transaction's receipt.
      const receipt = await tx.wait();

      // The receipt, contains a status flag, which is 0 to indicate an error.
      if (receipt.status === 0) {
        // We can't know the exact error that make the transaction fail once it
        // was mined, so we throw this generic one.
        throw new Error('Transaction failed');
      }

      // If we got here, the transaction was successful, so you may want to
      // update your state. Here, we update the user's balance.
    } catch (error: any) {
      // We check the error code to see if this error was produced because the
      // user rejected a tx. If that's the case, we do nothing.
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        // resetFields();
        toast({
          title: t('userCancelTransaction'),
          status: 'error',
          isClosable: true,
        });
        return;
      }
      // Other errors are logged and stored in the Dapp's state. This is used to
      // show them to the user, and for debugging.
      //console.error(error);
      toast({
        title: error.code,
        description: t('tokenUnavailable'),
        status: t('errorString'),
        isClosable: true,
      });
      setTokenID('');
      return;
    }
    // If we leave the try/catch, we aren't sending a tx anymore, so we clear
    // this part of the state.
    toast({
      title: t('TokenMintMessage'),
      description: t('NFTMintSuccess'),
      status: t('successString'),
      isClosable: true,
    });
    setTokenID('');
  };

  return (
    <>
      {!userWallet && (
        <Button w="100%" colorScheme="blue" onClick={connectWallet} mt="10">
          {t('connectWalletText')}
        </Button>
      )}
      {userWallet && (
        <Input
          w="100%"
          size="md"
          value={tokenID}
          onChange={tokenNameHandler}
          type="text"
          placeholder={t('tokenIDPlaceholder')}
          mt="10"
        ></Input>
      )}

      <Button
        w="100%"
        colorScheme="green"
        onClick={createTokenHandler}
        disabled={!userWallet || networkError}
        mt="10"
      >
        {t('mintTokenText')}
      </Button>

      {networkError && (
        <p className="network_error">{t('EthereumNetworkPrompt')}</p>
      )}
    </>
  );
};

export default DirectMint;
