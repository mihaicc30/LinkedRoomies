import "./style/App.css";
import { BrowserRouter, Routes, Route, Outlet, NavLink } from "react-router-dom";
import Login from "./components/UserManagement/Login";
import Logout from "./components/UserManagement/Logout";
import Register from "./components/UserManagement/Register";
import Reset from "./components/UserManagement/Reset";


import Admin from "./components/Admin/Admin";

import Dashboard from "./components/Dash/Dashboard";
import Contact from "./components/Contact/Contact";
import Profile from "./components/Profile/Profile";
import Accommodation from "./components/Accommodation/Accommodation";
import Questionnaire from "./components/Questionnaire/Questionnaire";

import { auth, db, logout } from "./config/firebase.jsx";
import Layout from "./components/Navigation/Layout";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
           

            {user && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/accommodation" element={<Accommodation />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
                {user.uid === import.meta.env.VITE_ADMIN && <Route path="/admin" element={<Admin />} />}
              </>
            )}

            {!user && (
              <>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/reset" element={<Reset />} />
              </>
            )}

            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
