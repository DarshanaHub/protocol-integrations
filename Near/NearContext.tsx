import { createContext } from "react";
import * as nearAPI from "near-api-js";

interface ContextProps {
  connectAccount: () => Promise<void>;
  initContract: () => Promise<{
    contract: nearAPI.Contract;
    currentUser:
      | {
          accountId: string;
          balance: string;
        }
      | undefined;
    nearConnection: nearAPI.Near;
    walletConnectionUser: nearAPI.WalletConnection;
  }>;
}

export const NearContext = createContext({} as ContextProps);
