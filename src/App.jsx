import "./style/App.css";
import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
	NavLink,
} from "react-router-dom";
import Login from "./components/UserManagement/Login";
import Logout from "./components/UserManagement/Logout";
import Register from "./components/UserManagement/Register";
import Reset from "./components/UserManagement/Reset";

import LandingPage from "./components/Navigation/LandingPage";

import Admin from "./components/Admin/Admin";

import Dashboard from "./components/Dash/Dashboard";
import Contact from "./components/Contact/Contact";
import Profile from "./components/Profile/Profile";
import Accommodation from "./components/Accommodation/Accommodation";
import Questionnaire from "./components/Questionnaire/Questionnaire";

import Layout from "./components/Navigation/Layout";

function App() {
	return (
		<div className="app">
			
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="/" element={<LandingPage />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="/reset" element={<Reset />} />{" "}
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/accommodation" element={<Accommodation />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/questionnaire" element={<Questionnaire />} />
						<Route path="/Admin" element={<Admin />} />
						<Route path="*" element={<Dashboard />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
export default App;
