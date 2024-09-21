import { ThemeProvider } from "@/components/theme-provider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import ClarityRootComponent from "./sdk/ClarityRootComponent";
// import PaymentPage from "./pages/PaymentPage";
import ErrorPage from "./pages/ErrorPage";
import ClarityRootComponent from "./sdk/ClarityRootComponent";
const router = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    // element: <PaymentPage />,
    element: (
      <ClarityRootComponent
        orderId=""
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
      {/* <ModeToggle /> */}
      <RouterProvider router={router} />
      {/* <ClarityRootComponent /> */}
    </ThemeProvider>
  );
};

export default App;
