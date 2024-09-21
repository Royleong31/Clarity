import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./admin-pages/AdminDashboard"; // Import the Admin component
import AdminSignup from "./admin-pages/AdminSignup";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Admin Dashboard */}
        <Route path="/adminsignup" element={<AdminSignup />} />
        <Route path="/" element={<AdminDashboard />} />
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
