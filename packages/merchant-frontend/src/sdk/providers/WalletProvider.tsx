// React
import { createContext, ReactNode, useEffect, useState } from "react";

// Dynamic
import {
  DynamicContextProvider,
  DynamicEmbeddedWidget,
  // DynamicWidget,
  Wallet,
  useUserWallets,

  // SdkViewSectionType, SdkViewType
} from "@dynamic-labs/sdk-react-core";
import { isEthereumWallet, EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { getSigner } from "@dynamic-labs/ethers-v6";
import { SdkViewSectionType, SdkViewType, SdkViewSectionAlignment } from "@dynamic-labs/sdk-api";

// Biconomy
import { ChainId } from "@biconomy/core-types";
import {
  IBundler,
  Bundler,
  BiconomySmartAccountV2,
  BiconomySmartAccountV2Config,
  ECDSAOwnershipValidationModule,
  DEFAULT_ENTRYPOINT_ADDRESS,
  DEFAULT_ECDSA_OWNERSHIP_MODULE,
  BiconomyPaymaster,
  IPaymaster,
} from "@biconomy/account";

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const environmentId = import.meta.env.VITE_DYNAMIC_ENV_ID;
  if (!environmentId) {
    throw new Error("Missing VITE_DYNAMIC_ENV_ID in .env, ask Ivan for .env file");
  }

  const locale = {
    en: {
      dyn_login: {
        title: {
          all: "Welcome to Clarity",
        },
      },
    },
  };

  const overrides = {
    views: [
      {
        type: SdkViewType.Login,
        sections: [
          {
            type: SdkViewSectionType.Social,
            defaultItem: "google",
            alignment: SdkViewSectionAlignment.Center,
          },
          {
            type: SdkViewSectionType.Separator,
            label: "Or",
          },
          {
            type: SdkViewSectionType.Email,
          },
        ],
      },
    ],
  };
  return (
    <DynamicContextProvider
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer/api
        environmentId: environmentId,
        walletConnectors: [EthereumWalletConnectors],
        overrides: overrides,
      }}
      locale={locale}
    >
      <SmartWalletProvider>
        {/* <WalletComponent /> */}
        {children}
      </SmartWalletProvider>
    </DynamicContextProvider>
  );
};

export const SmartWalletContext = createContext<BiconomySmartAccountV2 | undefined>(undefined);

const SmartWalletProvider = ({ children }: { children: ReactNode }) => {
  const userWallets = useUserWallets();
  const embeddedWallet: Wallet<any> | undefined = userWallets.find(
    (wallet) => wallet.connector?.isEmbeddedWallet === true
  );
  console.log("Embedded wallet:", embeddedWallet);
  const [smartWallet, setSmartWallet] = useState<BiconomySmartAccountV2>();

  useEffect(() => {
    // Async function to initialize the Biconomy SDK
    const initBiconomy = async () => {
      // Initialize your bundler
      const bundlerKey = import.meta.env.VITE_BUNDLER_KEY;
      const bundler: IBundler = new Bundler({
        bundlerUrl: `https://bundler.biconomy.io/api/v2/${ChainId.SEPOLIA}/${bundlerKey}`,
        chainId: ChainId.SEPOLIA, // Replace this with your desired network
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS, // This is a Biconomy constant
      });

      // Initialize your paymaster
      const paymasterKey = import.meta.env.VITE_PAYMASTER_KEY;
      const paymasterUrl = `https://paymaster.biconomy.io/api/v1/${ChainId.SEPOLIA}/${paymasterKey}`;
      const paymaster: IPaymaster = new BiconomyPaymaster({
        paymasterUrl: paymasterUrl,
      });

      if (!embeddedWallet) {
        throw new Error("Embedded wallet not found");
      }

      if (!isEthereumWallet(embeddedWallet)) {
        throw new Error("This wallet is not a Ethereum wallet");
      }

      // Note that we are using the ethers signer here rather than Viem
      const signer = await getSigner(embeddedWallet);
      const provider = await embeddedWallet.getWalletClient();

      // Initialize Biconomy's validation module with the ethers signer
      const validationModule = await ECDSAOwnershipValidationModule.create({
        signer: signer, // Use the `signer` we initialized above
        moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE, // This is a Biconomy constant
      });

      const smartAccountConfig: BiconomySmartAccountV2Config = {
        provider: provider,
        chainId: ChainId.SEPOLIA, // Replace this with your target network
        bundler: bundler, // Use the `bundler` we initialized above
        paymaster: paymaster, // Use the `paymaster` we initialized above
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS, // This is a Biconomy constant
        defaultValidationModule: validationModule, // Use the `validationModule` we initialized above
        activeValidationModule: validationModule, // Use the `validationModule` we initialized above
      };

      const smartAccount = await BiconomySmartAccountV2.create(smartAccountConfig);

      setSmartWallet(smartAccount);
      console.log("Set smart account", smartAccount);
    };
    initBiconomy();
  }, [embeddedWallet]);
  return <SmartWalletContext.Provider value={smartWallet}>{children}</SmartWalletContext.Provider>;
};
// const properties = {
//   // width: "100%",
//   // height: "100%",
//   // border: "none",
//   // backgroundColor: "red",
// };

export const ExtraContent = () => (
  <div className="extra-content-container">
    <p>This is some extra content!</p>
  </div>
);

export const WalletComponent = () => {
  return (
    <div className="flex items-center justify-center h-screen p-8">
      <div className="flex flex-col max-w-2xl">
        <DynamicEmbeddedWidget background="with-border" />
      </div>
    </div>
  );
};
