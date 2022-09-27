import { FC } from "react";
import * as nearAPI from "near-api-js";
import { NearContext } from "./NearContext";
import { getConfig } from "@api/near-config";
const { keyStores, connect, WalletConnection, Contract } = nearAPI;

export const NearProvider: FC<any> = ({ children }) => {
  const connectionConfig = getConfig(
    process.env.NEXT_PUBLIC_NEAR_NODE || "testnet"
  );
  //funcion para conectarse a la wallet de near
  const connectAccount = async () => {
    const nearConnection = await connect(connectionConfig);
    const walletConnection = new WalletConnection(nearConnection, "Darshana");
    const data = walletConnection.requestSignIn(connectionConfig.contractName);
  };
  const initContract = async () => {
    try {
      // get network configuration values from config.js
      // based on the network ID we pass to getConfig()
      const nearConnection = await connect(connectionConfig);
      // Initializing connection to the NEAR testnet

      // Initialize wallet connection
      const walletConnectionUser = new WalletConnection(
        nearConnection,
        "darshana"
      );
      // Load in user's account data
      let currentUser;
      if (walletConnectionUser.getAccountId()) {
        currentUser = {
          // Gets the accountId as a string
          accountId: walletConnectionUser.getAccountId(),
          // Gets the user's token balance
          balance: (await walletConnectionUser.account().state()).amount,
        };
      }

      // Initializing our contract APIs by contract name and configuration
      const contract = new Contract(
        // User's accountId as a string
        walletConnectionUser.account(),

        connectionConfig.contractName!,
        {
          // View methods are read-only – they don't modify the state, but usually return some value
          viewMethods: ["getRegisters"],
          // Change methods can modify the state, but you don't receive the returned value when called
          changeMethods: ["addRegisterValidation"],
        }
      );

      return { contract, currentUser, nearConnection, walletConnectionUser };
    } catch (error) {
      throw error;
    }
  };

  return (
    <NearContext.Provider
      value={{
        // Methods
        connectAccount,
        initContract,
      }}
    >
      {children}
    </NearContext.Provider>
  );
};
