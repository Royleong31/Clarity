import React, { createContext, useEffect, useState } from "react";
import { WalletComponent, WalletProvider } from "./providers/WalletProvider";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import PaymentCard from "./PaymentCard";
import PaymentCompletedCard from "./PaymentCompletedCard";
import ReviewCompletedCard from "./ReviewCompletedCard";
import LoadingPage from "@/pages/LoadingPage";
import { useRootState } from "@/hooks/useRootState";
import CheckoutCard from "./CheckoutCard";
import { isOrderPaid, isOrderReviewed } from "@/utils/readContract";

interface RootContextType {
  rootState: RootState;
  setRootState: React.Dispatch<React.SetStateAction<RootState>>;
}

// Create the context
export const RootContext = createContext<RootContextType | undefined>(
  undefined
);

interface RootState {
  orderId?: string;
  isOrderPaid?: boolean;
  isOrderReviewed?: boolean;
  paymentTransactionHash?: string;
  reviewTransactionHash?: string;
  price?: number;
  nullifierHash?: string;
  paymentSuccess: () => void;
  reviewSuccess: () => void;
}

const ClarityRootComponent = ({
  orderId,
  paymentSuccess,
  reviewSuccess,
}: RootState) => {
  const [rootState, setRootState] = useState<RootState>({
    orderId,
    paymentSuccess,
    reviewSuccess,
    isOrderReviewed: false,
  });

  useEffect(() => {
    setRootState((prevState) => ({
      ...prevState,
      orderId,
      paymentSuccess,
      reviewSuccess,
    }));
  }, [orderId, paymentSuccess, reviewSuccess]);
  return (
    <RootContext.Provider value={{ rootState, setRootState }}>
      <WalletProvider>
        <div className="w-2xl">
          <AuthConsumer />
        </div>
      </WalletProvider>
    </RootContext.Provider>
  );
};

// More like global sdk consumer
export function AuthConsumer() {
  const isLoggedIn = useIsLoggedIn();
  const { sdkHasLoaded } = useDynamicContext();

  const { rootState, setRootState } = useRootState();
  const {
    orderId,
    isOrderPaid: paid,
    isOrderReviewed: reviewed,
    paymentSuccess,
    reviewSuccess,
  } = rootState;

  useEffect(() => {
    // console.log("Root state", rootState);
    const read = async () => {
      if (orderId) {
        const paid = await isOrderPaid(orderId);
        // Check whether review has been reviewed
        const reviewed = await isOrderReviewed(orderId);

        if (
          !(
            paid === rootState.isOrderPaid &&
            reviewed === rootState.isOrderReviewed
          )
        ) {
          setRootState((prevState) => ({
            ...prevState,
            isOrderPaid: paid,
            isOrderReviewed: reviewed,
          }));
        }
      }
    };
    read();
  }, [rootState]);

  return <PaymentCard onSuccess={paymentSuccess} />; // Here, set order id when done
  if (!sdkHasLoaded) {
    return <LoadingPage />;
  }

  if (!orderId) {
    return <CheckoutCard />;
  }

  if (!isLoggedIn) {
    return <WalletComponent />;
  }

  if (orderId && !paid) {
    // Temporary attestation id, use something else later
    return <PaymentCard onSuccess={paymentSuccess} />; // Here, set order id when done
  }

  if (!reviewed) {
    return <PaymentCompletedCard onSuccess={reviewSuccess} />;
  }

  return (
    <>
      <ReviewCompletedCard />
    </>
  );
}

export default ClarityRootComponent;
