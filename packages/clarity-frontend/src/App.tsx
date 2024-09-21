import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import AdminDashboard from './admin-pages/AdminDashboard'; // Import the Admin component
import AdminSignup from './admin-pages/AdminSignup';
import { useMerchantsQuery } from "./generated/graphql";
import { useState } from 'react';

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
        <Route path="/" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
