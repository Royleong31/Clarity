import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./admin-pages/AdminDashboard"; // Import the Admin component
import AdminSignup from "./admin-pages/AdminSignup";
import { useMerchantsQuery } from "./generated/graphql";
import { useState } from "react";
import { createPublicClient, createWalletClient, http, custom } from "viem";
import { sepolia } from "viem/chains";
import { Hello } from "./clarity-sdk/Hello";

// const client = createPublicClient({
//   chain: sepolia,
//   transport: http(),
// });

const client = createWalletClient({
  chain: sepolia,
  transport: custom(window.ethereum!),
});

function App() {
  const [count, setCount] = useState(0);
  const { data } = useMerchantsQuery();
  return (
    <Router>
      <Routes>
        {/* Route for Admin Dashboard */}
        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Default route showing 'Hello world' */}
        <Route
          path="/"
          element={
            <div>
              <p>Hello world</p>
              <Hello/>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
