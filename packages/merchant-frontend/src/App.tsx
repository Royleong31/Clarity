import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import ClarityRootComponent from "./sdk/ClarityRootComponent";
// import PaymentPage from "./pages/PaymentPage";
import ErrorPage from "./pages/ErrorPage";
import ClarityRootComponent from "./sdk/ClarityRootComponent";
import ProfileCard from "./sdk/ProfileCard";
import { Toaster } from "@/components/ui/toaster"
import { ToastProvider } from "@radix-ui/react-toast";
const router = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <ProfileCard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    // element: <PaymentPage />,
    element: (
      <ClarityRootComponent
        paymentSuccess={() => {
          console.log("payment success");
        }}
        reviewSuccess={() => {
          console.log("review success");
        }}
      />
    ),
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      {/* <ModeToggle /> */}
      <RouterProvider router={router} />
      {/* <ClarityRootComponent /> */}
    </ThemeProvider>
  );
};

export default App;
