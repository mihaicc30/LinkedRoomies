import "./Config/App.css";
import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
	NavLink,
} from "react-router-dom";
import Login from "./UserManagement/Login";
import Logout from "./UserManagement/Logout";
import Register from "./UserManagement/Register";
import Reset from "./UserManagement/Reset";

import LandingPage from "./Navigation/LandingPage";

import Admin from "./Admin/Admin";

import Dashboard from "./Dash/Dashboard";
import Contact from "./Contact/Contact";
import Profile from "./Profile/Profile";
import Accommodation from "./Accommodation/Accommodation";
import Questionnaire from "./Questionnaire/Questionnaire";

import Layout from "./Navigation/Layout";

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
						{/*reset account password*/}
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/accommodation" element={<Accommodation />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="*" element={<Dashboard />} />
						<Route path="/questionnaire" element={<Questionnaire />} />
						<Route path="/Admin" element={<Admin />} />
						{/*admin panel*/}
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
export default App;
