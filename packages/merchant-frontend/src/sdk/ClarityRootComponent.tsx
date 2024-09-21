import React, { createContext, useEffect, useState } from "react";
import { WalletComponent, WalletProvider } from "./providers/WalletProvider";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import PaymentCard from "./PaymentCard";
import PaymentCompletedCard from "./PaymentCompletedCard";
import ReviewCompletedCard from "./ReviewCompletedCard";
import LoadingPage from "@/pages/LoadingPage";
import { useRootState } from "@/hooks/useRootState";

interface RootContextType {
  rootState: RootState;
  setRootState: React.Dispatch<React.SetStateAction<RootState>>;
}

// Create the context
export const RootContext = createContext<RootContextType | undefined>(undefined);

interface RootState {
  orderId?: string;
  attestationId?: string;
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
    attestationId: ''
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

  const { rootState } = useRootState();
  const { orderId, attestationId, paymentSuccess, reviewSuccess } = rootState;

  //TODO use orderId to query for review attestation, setReviewed to true if attestation found, setRootState

  if (!sdkHasLoaded) {
    return <LoadingPage />;
  }

  if (!isLoggedIn) {
    return <WalletComponent />;
  }

  if (!orderId) {
    return <PaymentCard onSuccess={paymentSuccess} />; // Here, set order id when done
  }

  if (!attestationId) {
    return <PaymentCompletedCard onSuccess={reviewSuccess} />;
  }

  return (
    <>
      <ReviewCompletedCard />
    </>
  );
}

export default ClarityRootComponent;
