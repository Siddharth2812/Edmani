import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
// import Navbar from "./components/Navbar/Navbar";
import UserSelectionPage from "./pages/Authentication/userSelection";
import LoginPage from "./pages/Authentication/login";
import Maths from "./pages/Subjects/Maths";
import Sidebar from "./components/Sidebar/Sidebar";
import HackathonForm from "./components/Hackathon/createHackathon";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HackathonCard from "./components/Hackathon/hackathonCard";
import HackathonPage from "./components/Hackathon/hackathonPage";
export const RouterJs = () => {
    return (
        <div >
            <Router>
                <Sidebar />
                <Routes>
                    <Route path="/" element={
                        <div className="Router">
                            <Home />
                        </div>
                    } />
                    <Route path="/login" element={
                        <div className="Router">
                            {/* <Sidebar /> */}
                            <UserSelectionPage />
                        </div>
                    } />
                    <Route path="/login/student" element={
                        <div className="Router">
                            {/* <Sidebar /> */}
                            <LoginPage />
                        </div>
                    } />
                    <Route path="/login/college" element={
                        <div className="Router">
                            {/* <Sidebar /> */}
                            <LoginPage />
                        </div>
                    } />
                    <Route path="/login/sports" element={
                        <div className="Router">
                            {/* <Sidebar /> */}
                            <LoginPage />
                        </div>
                    } />
                    <Route path="/login/personal" element={
                        <div className="Router">
                            {/* <Sidebar /> */}
                            <LoginPage />
                        </div>
                    } />
                    <Route path="/maths" element={
                        <div className="Router">
                            {/* <Sidebar /> */}
                            <Maths />
                        </div>
                    } />
                    <Route path="/hackathons" element={
                        <div className="Router">
                            {/* <Sidebar /> */}
                            <HackathonCard />
                        </div>
                    } />
 
                    <Route path="/hackathons/create" element={
                        <div className="Router">
                            {/* <Sidebar /> */}
                            <ToastContainer/>
                            <HackathonForm />
                        </div>
                    } />
                    <Route path="/hackathon/:id" element={
                        <div className="Router">
                            {/* <Sidebar /> */}
                            <HackathonPage />
                        </div>
                    } />
                </Routes>
            </Router>
        </div>
    )
}
