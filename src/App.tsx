import { Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import './assets/css/quick-styles.css'
import './assets/css/app.css'

import Landingpage from "./pages/LandingPage";
import Adminpanelpage from "./pages/AdminpanelPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Homepage from "./pages/HomePage.tsx";
import Pollspage from "./pages/PollsPage.tsx";
import PollPage from "./pages/PollPage.tsx";
import Historypage from "./pages/HistoryPage.tsx";
import Resultspage from "./pages/ResultsPage.tsx";

import Header from "./ui/header/Header.tsx";
import { Menu, X } from "lucide-react";
import NotFoundpage from "./pages/NotFoundPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";

function App() {
    const location = useLocation();

    useEffect(
        function () {

            setBtnState(!(["/", "/login"].includes(location.pathname)))

            setHeaderState(false);
        },
        [location]
    );

    const [header_state, setHeaderState] = useState(window.innerWidth > 500);
    const [btn_state, setBtnState] = useState(window.innerWidth > 500);

    function toggleHeader() {
        setHeaderState(prev => !prev);
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 800) {
                setHeaderState(true);
            } else {
                setHeaderState(false);
            }
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <Toaster position="top-right"/>
            {/* {!["/", "/login", '/signup'].includes(location.pathname) &&  */}
            <Header className={`sidebar ${header_state ? "show" : "hide"}`} />
            {/* } */}

            <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/admin" element={<Adminpanelpage />} />
                <Route path="/login" element={<LoginPage user_type="student" />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/polls" element={<Pollspage />} />
                <Route path="/poll/:id" element={<PollPage />} />
                <Route path="/results" element={<Resultspage />} />
                <Route path="/history" element={<Historypage />} />

                <Route path="/admin-login" element={<LoginPage user_type='admin' />} />
                <Route path="*" element={<NotFoundpage />} />
            </Routes>
            {btn_state && <button className="primary-btn" id="menu-btn" onClick={toggleHeader}>
                {header_state ? <X /> : <Menu />}
            </button>}
        </>
    )
}

export default App
